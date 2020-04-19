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
      },
      {
        headers: authHeader()
      });
  }

  deleteProject(id) {
    return axios.delete(API_URL + 'deleteProject/' + id, {
    },
    {
      headers: authHeader()
    });
  }

  updateProject(project) {
    return axios
      .put(API_URL + 'updateProject/' + project.id, {
        nombre: project.nombre,
        descripcion: project.descripcion,
        estado_id: project.estado_id
      },
      {
        headers: authHeader()
      });
  }
}

export default new ProjectService();