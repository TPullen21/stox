import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.alphavantage.co/query?apikey=0&function=TIME_SERIES_DAILY&symbol='
});

export default instance;