import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://backendis2.herokuapp.com/';
//const API_URL = 'http://localhost:3000/';

class ProjectService {

  listProjects() {
    return axios.get(API_URL + 'listProjects', {
      headers: authHeader()
    });
  }

  createProject(project) {
    return axios
      .post(API_URL + 'createProject', {
        nombre: project.nombre,
        descripcion: project.descripcion,
        estado_id: project.estado_id
      })
      .then(response => {
        //TODO CONSUMIR TOKEN DEL API Y UTILIZAR PARA LAS RUTAS
        // if (response.data.accessToken) {
        //   localStorage.setItem('user', JSON.stringify(response.data));
        // }
        return response.data;
      });
  }

  deleteProject(id) {
    return axios.delete(API_URL + 'deleteProject/' + id, {

    }).then(response => {
      return response.data
    })
  }

  updateProject(project) {
    return axios
      .put(API_URL + 'updateProject/' + project.id, {
        nombre: project.nombre,
        descripcion: project.descripcion,
        estado_id: project.estado_id
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

export default new ProjectService();