# this is the backend file
from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def predict():
    if request.method == "POST":
        df = pd.read_csv("data/SP500.csv")
        short_term = request.json["short_term"]
        volatility = request.json["volatility"]
        diversification = request.json["diversification"]
        risk = request.json["risk"]

    if short_term == 1:
        df = df.drop(["Betalong", "AnnualReturnLong"], axis=1)
    else:
        df = df.drop(["Volatility1Y", "Betashort"], axis=1)
