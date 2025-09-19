"use client";

const getStocks = () => {
    return new Promise((resolve, reject) => {
        return fetch("/api/stocks").then(r => r.json())
            .then(resolve)
            .catch(reject);
    });
};


export { getStocks };