"use client";

import toast from "react-hot-toast";
import { RESPONSE_STATUS, TWELVE_DATA_API_URL } from "../../utils/const";
import { mapHistoricalStockData } from "../../utils/utils";


const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        return fetch("/api/orders").then(r => r.json())
            .then(resolve)
            .catch(reject);
    });
};

const getOrdersByIsin = (isin) => {
    return new Promise((resolve, reject) => {
        return fetch(`/api/orders?isin=${isin}`).then(r => r.json())
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
                console.log("metadata response check", response)
                if (response.status === RESPONSE_STATUS.ERROR) {
                    return Promise.reject(new Error(response.message));
                }

                const parsedProducts = Object.entries(response).map(([isin, obj]) => ({
                    isin,
                    ...obj
                }));

                resolve(parsedProducts);
            })
            .catch(error => {
                toast.error("Something went wrong.");
                console.error("Error fetching metadata:", error);
                reject(error);
            });
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
    getOrdersByIsin,
    getAllProducts, 
    getMetadataOfProducts,
    getHistoricalStockDataByIsbn 
};