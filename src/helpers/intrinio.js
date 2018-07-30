import axios from '../axios/axios-intrinio';
import firebase from '../axios/axios-firebase';

const sendDataToFirebase = (response) => {

    let securities = {};
  
    response.forEach(result => {
  
      const data = result.data.data;
  
      data.forEach(datum => {
        const ticker = datum.ticker.replace(/\W/g, '');
  
        securities[ticker] = {
          ticker: ticker,
          securityName: datum.security_name,
          securityType: datum.security_type,
          stockExchange: datum.stock_exchange
        }
      });
      
    });
  
    console.log(securities);
  
    firebase.put('/securities.json', securities)
      .then(response => console.log('Posted securities'))
      .catch(err => console.log('Errored'+ '\n' + err.message));
  
  }
  
  async function getPagedSecurityData(param) {
  
    return axios.get('/securities?active_only=true&page_number=' + param);
  }
  
  async function getSecurities() {
  
    const arr = [];
  
    let i = 0;
    for(i = 1; i < 81; i++) {
      arr.push(getPagedSecurityData(i));
    }
  
    return await Promise.all(arr);
  }

  class Intrinio {

    getSecuritiesAndPostToFirebase = () => {

        getSecurities().then(response => sendDataToFirebase(response));
    }

  }

  export default Intrinio;