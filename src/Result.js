import React from 'react';
import StockInfo from './StockInfo.js';
import React from 'react';
import Results from './components/Results';


import React, { useEffect, useState } from 'react';
import StockInfo from './StockInfo'; // Adjust the path as necessary

function Results() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                // Make sure to replace "http://localhost:5000/api/stocks" with the actual URL of your Flask backend
                const response = await fetch('http://localhost:5000/api/stocks');
                const data = await response.json();
                // Convert the object of objects into an array of objects
                const stocksArray = Object.values(data);
                setStocks(stocksArray);
            } catch (error) {
                console.error("Failed to fetch stocks:", error);
            }
        };

        fetchStocks();
    }, []);

    return (
        <div className="results-container">
            <h2>Stock Results</h2>
            {stocks.map((stock, index) => (
                <StockInfo key={index} stock={stock} />
            ))}
        </div>
    );
}

export default Results;

