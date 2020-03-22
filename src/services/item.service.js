import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class ItemService {

  listItems() {
    return axios.get(API_URL + 'listItems', { headers: authHeader() });
  }

  createItem(item) {
    return axios
        .post(API_URL + 'createItem', { headers: authHeader() }, {
            estado_id: item.estado_id,
            descripcion: item.descripcion,
            observacion: item.observacion,
            prioridad_id: item.prioridad_id,
            fase_id: item.fase_id
        });
  }
  

  editItem() {
    return axios.post(API_URL + 'editItem', { headers: authHeader() });
  }
  
  deleteItem() {
    return axios.post(API_URL + 'deleteItem', { headers: authHeader() });
  }

}

export default new ItemService();
