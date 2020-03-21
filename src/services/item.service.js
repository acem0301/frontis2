import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class ItemService {

  listItems() {
    return axios.get(API_URL + 'listItems', { headers: authHeader() });
  }

  createItem() {
    return axios.post(API_URL + 'createItem', { headers: authHeader() });
  }

  editItem() {
    return axios.post(API_URL + 'editItem', { headers: authHeader() });
  }
  
  deleteItem() {
    return axios.post(API_URL + 'deleteItem', { headers: authHeader() });
  }

}

export default new ItemService();
