import { ORDER_TYPE } from "./const";

const mapHistoricalStockData = (data) => {

    return data.values.map(item => 
        {
            return {
                time:item.datetime,
                value: Number(item.close)
                }
        });
}

const mapOrdersToGraphMarkers = (orders) => {
    return orders.map(order => {
        return {
            date: order.Datum,
            coursePrice: order.Kurs,
            type: Number(orders[0]["Wert in Lokalwährung"]) >= 0 ? ORDER_TYPE.SELL : ORDER_TYPE.BUY,
            amount: order.Anzahl,
            orderId: order["Order-ID"],
            totelPrice: Math.abs(Number(order["Wert in Lokalwährung"]))
        };
    });
}

export { mapHistoricalStockData, mapOrdersToGraphMarkers };