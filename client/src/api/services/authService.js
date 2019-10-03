const axios = require('axios');
const restClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000
});
var jwt = require('jsonwebtoken');

export default class AuthService {
  async login(email, password) {
    try {
      const response = await restClient.post(`/auth/login`, {email, password});
      localStorage.setItem("app-token", response.data);
      let decoded = jwt.decode(response.data, {json: true});
      decoded = {
        "sub": "User",
        "exp": 1565659314,
        "iat": 1565659304,
        "userId": 1,
        "userName": "Nicolas",
        "userLastName": "Cargnelutti",
        "userEmail": "necargnelutti@gmail.com"
      }
      // sessionStorage.setItem("gps-user-info", decoded);
      return decoded;
    } catch (error) {
      console.log(`Error in function login. Message: ${error}`);
      return null; //redirect ??
    }
  }
}