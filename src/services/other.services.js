import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class OthersServices {


  listStates(table_name) {
    return axios.get(API_URL + 'listStates',  {
        table_name: table_name
      }, { headers: authHeader() });
  }
}

export default new OthersServices();
