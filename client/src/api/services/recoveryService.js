import BaseService from './baseService';
import to from "await-to-js";
const restClient = new BaseService();

export default class RecoveryService {

  static async validateRecoveryId(recoveryId) {

    const [err] = await to(restClient.get(`/recovery/${recoveryId}/validate`));
    if (err) {
      console.log(`[message: Error trying to validate password recovery id ${recoveryId}] [error: ${JSON.stringify(err)}]`)
      throw err;
    }
  }

  static async resetPassword(recoveryId, password) {
    const [err] = await to(restClient.put(`/recovery/${recoveryId}`, null, {password}));
    if (err) {
      console.log(`[message: Error trying to reset password] [error: ${JSON.stringify(err)}]`)
      throw err;
    }
  }
}