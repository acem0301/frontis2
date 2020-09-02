import axios from 'axios';
import authHeader from './auth-header';
//const API_URL = 'https://backendis2.herokuapp.com/';
const API_URL = 'http://localhost:3000/';

class TareaService {

  listItems() {
    return axios.get(API_URL + 'listItems', {
      headers: authHeader()
    });
  }

  createItem(item) {
    return axios
      .post(API_URL + 'createItem/' + item.proyecto_id, {
        version: '1',
        prioridad_id: item.prioridad_id,
        descripcion: item.descripcion,
        observacion: item.observacion
      }, {
        headers: authHeader()
      });
  }

  deleteItem(id) {
    return axios.delete(API_URL + 'deleteItem/' + id, {}, {
      headers: authHeader()
    });
  }

  updateItem(item) {
    return axios
      .put(API_URL + 'updateItem/' + item.id, {
        version: '1',
        prioridad_id: item.prioridad_id,
        estado_id: item.estado_id,
        descripcion: item.descripcion,
        observacion: item.observacion,
        fase_id: item.fase_id,
        id_tarea_padre: item.id_tarea_padre,
        es_padre: false
      }, {
        headers: authHeader()
      });
  }

  updateItemState(id) {
    return axios
      .put(API_URL + 'updateItemState/' + id, {}, {
        headers: authHeader()
      });
  }
}

export default new TareaService();