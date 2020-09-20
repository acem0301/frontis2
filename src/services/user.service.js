import axios from 'axios';
import authHeader from './auth-header';
<<<<<<< Updated upstream
//const API_URL = 'https://backendis2.herokuapp.com/';
const API_URL = 'http://localhost:3000/';
=======
import API_URL from '../constant/constant'
>>>>>>> Stashed changes

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