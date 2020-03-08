import BaseService from './baseService';
import to from "await-to-js";
const restClient = new BaseService();

export default class RolesService {

  static async getRoles() {
    const [err, response] = await to(restClient.get(`/roles`));
    if (err) {
      console.log(`[message: Error trying to get roles list] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }
}