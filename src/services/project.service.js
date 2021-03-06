import axios from 'axios';
import authHeader from './auth-header';
import constant from '../constant/constant';

const API_URL = constant.API_URL;

class ProjectService {

  listProjects(showProjectFinalized) {
    return axios.get(API_URL + 'listProjects/' + showProjectFinalized, {
      headers: authHeader()
    });
  }

  createProject(project) {
    return axios
      .post(API_URL + 'createProject', {
        nombre: project.nombre,
        descripcion: project.descripcion,
        estado_id: project.estado_id
      }, {
        headers: authHeader()
      });
  }

  deleteProject(id) {
    return axios.delete(API_URL + 'deleteProject/' + id, {}, {
      headers: authHeader()
    });
  }

  updateProject(project) {
    return axios
      .put(API_URL + 'updateProject/' + project.id, {
        nombre: project.nombre,
        descripcion: project.descripcion,
        estado_id: project.estado_id
      }, {
        headers: authHeader()
      });
  }
}

export default new ProjectService();