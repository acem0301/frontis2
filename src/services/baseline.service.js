import axios from 'axios';
import authHeader from './auth-header';
import constant from '../constant/constant';

const API_URL = constant.API_URL;

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