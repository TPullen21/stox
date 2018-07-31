import _ from 'lodash';

class LocalStorage {

    getStocks = () => {
        const stocksFromStorage = localStorage.getItem("stocks");
        return stocksFromStorage ? stocksFromStorage.split(',') : [];
    }

    addStock = ticker => {
        
        const stocks = this.getStocks();

        stocks.push(ticker);
        localStorage.setItem("stocks", stocksToAdd);
    }

    removeStock = ticker => {
        
        const stocks = this.getStocks();

        const alteredStocks = _.remove(stocks, stock => {
            return ticker === stock;
        });

        localStorage.setItem("stocks", alteredStocks);
    }

}

export default LocalStorage;