"use client";

import { HISTORICAL_STOCK_TEST_DATA } from "../../utils/const";
import { mapHistoricalStockData } from "../../utils/utils";

const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        return fetch("/api/orders").then(r => r.json())
            .then(resolve)
            .catch(reject);
    });
};

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        return fetch("/api/products").then(r => r.json())
            .then(resolve)
            .catch(reject);
    });
};


const getHistoricalStockDataByIsbn = (isbn, interval="1month", ) => {
    return new Promise((resolve, reject) => {
    // const apiKey = process.env.TWELVE_DATA_API_KEY;
    // const url = `https://api.twelvedata.com/time_series?symbol=${isbn}&interval=${interval}&apikey=${apiKey}`;

        const fetchedData = HISTORICAL_STOCK_TEST_DATA;
        const mappedData = mapHistoricalStockData(fetchedData);
        resolve(mappedData);
    });
};


export { getAllOrders, getAllProducts, getHistoricalStockDataByIsbn};