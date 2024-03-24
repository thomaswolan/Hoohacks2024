import yfinance as yf

ticker = "aapl"

result = dict()

result["name"] = yf.Ticker(ticker).info["longName"]
result["sector"] = yf.Ticker(ticker).info["sector"]
result["industry"] = yf.Ticker(ticker).info["industry"]
result["marketCap"] = yf.Ticker(ticker).info["marketCap"]
result["Longbusinesssummary"] = yf.Ticker(ticker).info["longBusinessSummary"]

print(result)
