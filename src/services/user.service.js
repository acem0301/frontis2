import axios from 'axios';
import authHeader from './auth-header';
//const API_URL = 'https://backendis2.herokuapp.com/';
const API_URL = 'http://localhost:3000/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', {
      headers: authHeader()
    });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', {
      headers: authHeader()
    });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', {
      headers: authHeader()
    });
  }

  deleteUser(id) {
    return axios.delete(API_URL + 'deleteUser/' + id, {
    },
    {
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
        password: user.password
      },
      {
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
        password: user.password
      },
      {
        headers: authHeader()
      });
  }

}

export default new UserService();