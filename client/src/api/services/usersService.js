import BaseService from './baseService';
import to from "await-to-js";
const restClient = new BaseService();

export default class UsersService {

  static async createUser(user) {
    const [err, response] = await to(restClient.post(`/users`, null, user));
    if (err) {
      console.log(`[message: Error creating user] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }

  static async getUserByEmail(email) {

    const [err, response] = await to(restClient.get(`/users?email=${email}`));
    if (err) {
      console.log(`[message: Error getting user ${email}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }
}
