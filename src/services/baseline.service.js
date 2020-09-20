import axios from 'axios';
import authHeader from './auth-header';
import API_URL from '../constant/constant'

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