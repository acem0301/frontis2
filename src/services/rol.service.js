import axios from 'axios';
import authHeader from './auth-header';
import constant from '../constant/constant';

const API_URL = constant.API_URL;
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