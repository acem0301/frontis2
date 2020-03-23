import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'https://backendis2.herokuapp.com/';
const API_URL = 'http://localhost:3000/';
class RolService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  listRoles() {
    return axios.get(API_URL + 'listRoles', {
      headers: authHeader()
    });
  }
  
  deleteRol(id) {
    return axios.delete(API_URL + 'deleteRol/' + id, {

    }).then(response => {
      return response.data
    })
  }

  updateRol(rol) {
    return axios
      .put(API_URL + 'updateRol/' + rol.id, {
        descripcion: rol.descripcion
      })
      .then(response => {
        //TODO CONSUMIR TOKEN DEL API Y UTILIZAR PARA LAS RUTAS
        // if (response.data.accessToken) {
        //   localStorage.setItem('user', JSON.stringify(response.data));
        // }
        return response.data;
      });
  }

  createRol(rol) {
    return axios
      .post(API_URL + 'createRol', {
        descripcion: rol.descripcion
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

export default new RolService();