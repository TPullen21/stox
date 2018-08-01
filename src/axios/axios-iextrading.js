import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.iextrading.com/1.0/stock',
    params: {
        types: 'quote',
        range: '1m'
    }
});

export default instance;