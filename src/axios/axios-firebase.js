import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://stox2121.firebaseio.com'
});

export default instance;