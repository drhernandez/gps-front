import Constants from "../../utils/Constants"
const axios = require('axios');
const restClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000
});
var jwt = require('jsonwebtoken');

export default class AuthService {
  
  static async login(email, password) {
    try {
      const response = await restClient.post(`/auth/login`, {email, password});
      localStorage.setItem(Constants.LocalStorageKeys.ACCESS_TOKEN_KEY, response.data.token);
      return jwt.decode(response.data.token, {json: true});
      
    } catch (error) {
      console.log(`Error in function login. Message: ${error}`);
      throw error;
    }
  }

  static async verifyToken(token) {
    try {
      await restClient.get(`/auth/validate`);
      return jwt.decode(token, { json: true });

    } catch (error) {
      console.log(`Error verifying token. Message: ${error}`);
      throw error;
    }
  }
}