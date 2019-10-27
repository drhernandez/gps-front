import Constants from "../../utils/Constants"
import BaseService from './baseService';
import jwt from "jsonwebtoken";
import to from "await-to-js";
const restClient = new BaseService();

export default class AuthService {
  
  static async login(email, password) {

    const [err, response] = await to(restClient.post(`/auth/login`, null, { email, password }));
    if (err) {
      console.log(`[message: Error trying to login] [error: ${JSON.stringify(err)}]`)
      throw err;
    }

    localStorage.setItem(Constants.LocalStorageKeys.ACCESS_TOKEN_KEY, response.data.token);
    return jwt.decode(response.data.token, { json: true });
  }

  static async verifyToken(token) {
    const [err] = await to(restClient.get(`/auth/validate`));
    if (err) {
      console.log(`[message: Error validating token] [error: ${JSON.stringify(err)}]`)
      throw err;
    }

    return jwt.decode(token, { json: true });
  }

  static logout() {
    localStorage.removeItem(Constants.LocalStorageKeys.ACCESS_TOKEN_KEY);
  }
}