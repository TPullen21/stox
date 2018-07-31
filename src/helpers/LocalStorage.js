import _ from 'lodash';

class LocalStorage {

    static getStocks()  {
        const stocksFromStorage = localStorage.getItem("stocks");
        return stocksFromStorage ? stocksFromStorage.split(',') : [];
    }

    static addStock (ticker) {
        
        const stocks = this.getStocks();

        stocks.push(ticker);
        localStorage.setItem("stocks", stocks);
    }

    static removeStock (ticker) {
        
        const stocks = this.getStocks();

        _.remove(stocks, stock => {
            return ticker === stock;
        });

        localStorage.setItem("stocks", stocks);
    }

}

export default LocalStorage;