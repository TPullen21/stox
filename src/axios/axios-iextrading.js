import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.iextrading.com/1.0/stock/market',
    params: {
        types: 'quote',
        range: '1s'
    }
});

export default instance;