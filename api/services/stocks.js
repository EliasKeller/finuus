"use client";

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


export { getAllOrders, getAllProducts };