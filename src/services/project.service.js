import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class ProjectService {

  listProjects() {
    return axios.get(API_URL + 'listProjects', { headers: authHeader() });
  }

  createProject() {
    return axios.post(API_URL + 'createProject', { headers: authHeader() });
  }

  editProject() {
    return axios.post(API_URL + 'editProject', { headers: authHeader() });
  }
  
  deleteProject() {
    return axios.post(API_URL + 'deleteProject', { headers: authHeader() });
  }

}

export default new ProjectService();
