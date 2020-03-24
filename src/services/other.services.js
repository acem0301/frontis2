import axios from 'axios';
import authHeader from './auth-header';
//const API_URL = 'https://backendis2.herokuapp.com/';
const API_URL = 'http://localhost:3000/';

class OthersServices {


  listStates(table_name) {
    return axios.get(API_URL + 'listEstados' + '/' + table_name, 
    { headers: authHeader() });
  }

  listPriorities() {
    return axios.get(API_URL + 'listPrioridad', 
    { headers: authHeader() });
  }

  listPhases() {
    return axios.get(API_URL + 'listFases', 
    { headers: authHeader() });
  }
}

export default new OthersServices();
