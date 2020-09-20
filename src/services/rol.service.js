import axios from 'axios';
import authHeader from './auth-header';

<<<<<<< Updated upstream
//const API_URL = 'https://backendis2.herokuapp.com/';
const API_URL = 'http://localhost:3000/';
=======
import API_URL from '../constant/constant'
>>>>>>> Stashed changes
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
    return axios.delete(API_URL + 'deleteRol/' + id, {}, {
      headers: authHeader()
    });
  }

  updateRol(rol) {
    return axios
      .put(API_URL + 'updateRol/' + rol.id, {
        descripcion: rol.descripcion
      }, {
        headers: authHeader()
      });
  }

  createRol(rol) {
    return axios
      .post(API_URL + 'createRol', {
        descripcion: rol.descripcion
      }, {
        headers: authHeader()
      });
  }
}

export default new RolService();