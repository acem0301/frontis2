import axios from 'axios';
import authHeader from './auth-header';
import constant from '../constant/constant';

const API_URL = constant.API_URL

class OthersServices {


  listStates(table_name) {
    return axios.get(API_URL + 'listEstados' + '/' + table_name, {
      headers: authHeader()
    });
  }

  listPriorities() {
    return axios.get(API_URL + 'listPrioridad', {
      headers: authHeader()
    });
  }

  listPhases() {
    return axios.get(API_URL + 'listFases', {
      headers: authHeader()
    });
  }
}

export default new OthersServices();