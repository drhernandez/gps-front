import BaseService from './baseService';
import to from "await-to-js";
const restClient = new BaseService();

export default class ClientsService {

  static async createClient(client) {
    const [err, response] = await to(restClient.post(`/users`, null, client));
    if (err) {
      console.log(`[message: Error creating user] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }

  static async getVehiclesByUserID(userID) {
    const [err, response] = await to(restClient.get(`/users/${userID}/vehicles`));
    if (err) {
      console.log(`[message: Error getting vehicles info for user ${userID}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }
}
