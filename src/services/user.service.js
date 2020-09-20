import axios from 'axios';
import authHeader from './auth-header';
import constant from '../constant/constant';

const API_URL = constant.API_URL;

class UserService {
  deleteUser(id) {
    return axios.delete(API_URL + 'deleteUser/' + id, {
      headers: authHeader()
    });
  }

  updateUser(user) {
    return axios
      .put(API_URL + 'updateUser/' + user.id, {
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol_id: user.rol_id,
        username: user.username,
        password: user.password,
        proyecto_id: user.proyecto_id
      }, {
        headers: authHeader()
      });
  }

  listUsers() {
    return axios.get(API_URL + 'listUsers', {
      headers: authHeader()
    });
  }

  createUser(user) {
    return axios
      .post(API_URL + 'createUser', {
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol_id: user.rol_id,
        username: user.username,
        password: user.password,
        proyecto_id: user.proyecto_id
      }, {
        headers: authHeader()
      });
  }
}

export default new UserService();