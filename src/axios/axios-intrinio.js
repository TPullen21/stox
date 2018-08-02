import axios from 'axios';

const username = "8ac127eedfb32ac45039462563d6ed00";
const password = "b4627820484c7fa41b34250cfa29df45";
const auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

const instance = axios.create({
    baseURL: 'https://api.intrinio.com',
    headers: {
        "Authorization": auth
    }
});

export default instance;