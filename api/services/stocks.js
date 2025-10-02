"use client";

import { HISTORICAL_STOCK_TEST_DATA, TWELVE_DATA_API_URL } from "../../utils/const";
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


const getMetadataOfProducts = (productIsbn = []) => {
    const url = `${TWELVE_DATA_API_URL}/quote?isin=${productIsbn.join(",")}&apikey=${process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY}`;

    return new Promise((resolve, reject) => {
        return fetch(url).then(r => r.json())
            .then(response => {
                const parsedProducts = Object.entries(response).map(([isin, obj]) => ({
                    isin,
                    ...obj
                }));

                resolve(parsedProducts);
            })
            .catch(reject);
    });
};

const getHistoricalStockDataByIsbn = (isin, interval="1day", ) => {
    const url = `${TWELVE_DATA_API_URL}/time_series?isin=${isin}&interval=${interval}&apikey=${process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY}`;

    return new Promise((resolve, reject) => {
        return fetch(url).then(r => r.json())
            .then(response => {
                const mappedData = mapHistoricalStockData(response);
                resolve(mappedData);
            })
            .catch(reject);
    });
};


export { 
    getAllOrders, 
    getAllProducts, 
    getMetadataOfProducts,
    getHistoricalStockDataByIsbn 
};