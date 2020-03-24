import axios from 'axios';
import authHeader from './auth-header';
//const API_URL = 'https://backendis2.herokuapp.com/';
const API_URL = 'http://localhost:3000/';

class ItemService {

  listItems() {
    return axios.get(API_URL + 'listItems', {
      headers: authHeader()
    });
  }

  createItem(item) {
    return axios
      .post(API_URL + 'createItem', {
        version: '1',
        prioridad_id: item.prioridad_id,
        estado_id: item.estado_id,
        descripcion: item.descripcion,
        observacion: item.observacion,
        fase_id: item.fase_id,
        id_tarea_padre: null,
        es_padre: false
      });
  }


  deleteItem(id) {
    return axios.delete(API_URL + 'deleteItem/' + id, {

    }).then(response => {
      return response.data
    })
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
      })
      .then(response => {
        //TODO CONSUMIR TOKEN DEL API Y UTILIZAR PARA LAS RUTAS
        // if (response.data.accessToken) {
        //   localStorage.setItem('user', JSON.stringify(response.data));
        // }
        return response.data;
      });
  }

}

export default new ItemService();