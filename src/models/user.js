export default class User {
  constructor(username, email, password, nombre, apellido, rol_id) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.rol_id = rol_id
  }
}