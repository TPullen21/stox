import axios from 'axios';

const username = "";
const password = "";
const auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

const instance = axios.create({
    baseURL: 'https://api.intrinio.com',
    headers: {
        "Authorization": auth
    }
});

export default instance;