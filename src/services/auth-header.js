export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token }; 
    // return { 'x-access-token': user.accessToken };       // Consumir del backend. 
  } else {
    return {};
  }
}
