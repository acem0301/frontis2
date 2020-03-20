import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'https://backendis2.herokuapp.com/';
const API_URL = 'http://localhost:3000/';
class RolService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  listRoles() {
    return axios.get(API_URL + 'listRoles', { headers: authHeader() });
  }
}

export default new RolService();
