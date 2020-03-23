export default class Item {
    constructor(id, nombre_item, nombre_prioridad, estado_id, descripcion,observacion,
         fase_nombre, prioridad_id, fase_id) {
      this.estado_id = estado_id;
      this.descripcion = descripcion;
      this.observacion = observacion;
      this.prioridad_id = prioridad_id;
      this.fase_id = fase_id;
    }
  }