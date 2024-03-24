// StockInfo.js
import React from 'react';

const StockInfo = ({ stockData }) => {
  return (
    <div className="stock-card">
      <h2>{stockData.name} ({stockData.symbol})</h2>
      <p>Price: ${stockData.price}</p>
      <p>Market Cap: ${stockData.marketCap}</p>
      // Add more stock details as needed
    </div>
  );
}

export default StockInfo;
