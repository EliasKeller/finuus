const mapHistoricalStockData = (data) => {

    return data.values.map(item => 
        {
            return {
                time:item.datetime,
                value: Number(item.close)
                }
        });
}




export { mapHistoricalStockData };