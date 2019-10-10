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
      localStorage.setItem("app-token", response.data.token);
      let decoded = jwt.decode(response.data.token, {json: true});
      
      return decoded;

    } catch (error) {
      console.log(`Error in function login. Message: ${error}`);
      return null; //redirect ??
    }
  }
}