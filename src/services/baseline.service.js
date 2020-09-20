import axios from 'axios';
import authHeader from './auth-header';
//const API_URL = 'https://backendis2.herokuapp.com/';
const API_URL = 'http://localhost:3000/';

class LineaBaseService  {
    listBaselines() {
        return axios.get(API_URL + 'listBaselines', {
          headers: authHeader()
        });
      }

      createbaseline(baseline) {
        return axios
          .post(API_URL + 'createBaselines/', {
            nombre: baseline.nombre,
            items: baseline.items_id,
            estado_id: baseline.estado_id
          }, {
            headers: authHeader()
          });
      }
}

export default new LineaBaseService();