import { ORDER_TYPE } from "./const";

const mapHistoricalStockData = (stockData) => {

    return (stockData.values ?? []).map(item => 
        {
            return {
                time:item.datetime,
                value: Number(item.close)
                }
        });
}

const mapCsvOrdersData = (orders) => {

    return orders.map(order =>{
        return {
            date: order.Datum,
            time: order.Uhrzeit,
            product: order.Produkt,
            isin: order.ISIN,
            stockMarket: order.Referenzbörse,
            id: order["Order-ID"],
            course: Number(order.Kurs),
            totalValue: Number(order.Gesamt),
            value: Number(order.Wert),
            fee: Number(order.Transaktionsgebühren),
            exchangeRate: Number(order.Wechselkurs),
            valueInLocalCurrency: Number(order["Wert in Lokalwährung"]),
            amount: Number(order.Anzahl),
            placeOfExecution: order.Ausführungsort, 
            type: Number(order.Wert) >= 0 ? ORDER_TYPE.SELL : ORDER_TYPE.BUY
        }
    })
}

export { mapHistoricalStockData, mapCsvOrdersData };