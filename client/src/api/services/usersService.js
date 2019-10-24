import BaseService from './baseService';
import to from "await-to-js";

export default class UsersService {
  constructor() {
    this.baseService = new BaseService();
  }

  async createUser(user) {
    const [err, response] = await to(this.baseService.post(`/users`, null, user));
    if (err) {
      console.log(`[message: Error creating user] [error: ${err.message}]`);
      throw err;
    }
    console.log(response);
    return response.data;
  }

  async getVehiclesByUserID(userID) {
    const [err, response] = await to(this.baseService.get(`/users/${userID}/vehicles`));
    if (err) {
      console.log(`[message: Error getting vehicles info for user ${userID}] [error: ${err.message}]`);
      throw err;
    }

    return response.data;
  }
}
