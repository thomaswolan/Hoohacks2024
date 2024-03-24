# this is the backend file
from flask import Flask, request, jsonify
import yfinance as yf
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd

app = Flask(__name__)


@app.route("/results", methods=["POST"])
def predict():
    df = pd.read_csv("data/SP500.csv")
    short_term = request.json["short_term"]
    diversification = request.json["diversification"]
    risk = request.json["risk"]

    if short_term == 1:
        df = df.drop(["Betalong", "AnnualReturnLong"], axis=1)
        df = df.rename(
            columns={"Betashort": "Beta", "AnnualReturnShort": "AnnualReturn"}
        )
    else:
        df = df.drop(["Betashort", "AnnualReturnShort"], axis=1)
        df = df.rename(columns={"Betalong": "Beta", "AnnualReturnLong": "AnnualReturn"})

    # Split the data into features and target for the first model
    X = df.drop(
        ["Symbol", "Shortname", "Sector", "Longbusinesssummary", "AnnualReturn"],
        axis=1,
    )
    Y = df["AnnualReturn"]

    # Split the data into training and testing sets
    X_train, X_test, Y_train, Y_test = train_test_split(
        X, Y, test_size=0.2, random_state=42
    )

    # Train the random forest model
    rf_regressor = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_price = rf_regressor.fit(X_train, Y_train)

    # Make predictions
    prediction_price = rf_price.predict(X)

    # Classify based on risk
    X = df.drop(
        [
            "Symbol",
            "Shortname",
            "Sector",
            "Longbusinesssummary",
            "Currentprice",
            "Ebitda",
            "AnnualReturn",
            "Revenuegrowth",
        ],
        axis=1,
    )

    Y = df["Beta"]

    X_train, X_test, Y_train, Y_test = train_test_split(
        X, Y, test_size=0.2, random_state=42
    )

    rf_risk = RandomForestRegressor(n_estimators=100, random_state=42)

    rf_risk = rf_risk.fit(X_train, Y_train)

    prediction_risk = rf_risk.predict(X)

    # accuracy = rf_risk.score(X_test, Y_test)

    # print(accuracy)

    # Assing weights to risk prediction
    weight_price = risk / 5
    weight_risk = 1 - weight_price

    # Combine predictions
    combined_pred = (weight_price * prediction_price) + (weight_risk * prediction_risk)

    # Rank predictions based on combined score
    ranked_indices = np.argsort(combined_pred)[::-1]  # Sort in descending order

    # Sort indices based on combined_pred
    sorted_indices = np.argsort(combined_pred)[::-1]  # Sort in descending order

    # Re-rank the DataFrame
    ranked_df = df.iloc[sorted_indices]

    # Reset index if needed
    ranked_df.reset_index(drop=True, inplace=True)

    result = dict()
    sectors = list()

    if diversification == 1:
        for index, row in ranked_df.iterrows():
            if len(result) == 5:
                break
            if row["sector"] not in sectors:
                sectors.append(row["sector"])
                result[index] = row.to_dict()

    return jsonify(result)


@app.route("/search", methods=["POST"])
def search():
    ticker = request.json
    result = dict()

    result["name"] = yf.Ticker(ticker).info["longName"]
    result["sector"] = yf.Ticker(ticker).info["sector"]
    result["industry"] = yf.Ticker(ticker).info["industry"]
    result["marketCap"] = yf.Ticker(ticker).info["marketCap"]
    result["Longbusinesssummary"] = yf.Ticker(ticker).info["longBusinessSummary"]

    # returning result
    return jsonify(result)


if __name__ == "__app__":
    app.run(debug=True)
