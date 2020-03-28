import BaseService from './baseService';
import to from "await-to-js";
const restClient = new BaseService();

export default class RecoveryService {

  static async generateToken(email) {
    const [err] = await to(restClient.post(`/recovery`, null, { email }));
    if (err) {
      console.log(`[message: Error trying to generate recovery token] [error: ${JSON.stringify(err)}]`)
      throw err;
    }
  }

  static async validateRecoveryId(recoveryToken) {
    const [err] = await to(restClient.get(`/recovery/validate`, { 'x-recovery-token': recoveryToken }));
    if (err) {
      console.log(`[message: Error trying to validate recovery token ${recoveryToken}] [error: ${JSON.stringify(err)}]`)
      throw err;
    }
  }

  static async resetPassword(recoveryToken, password) {
    const [err] = await to(restClient.put(`/recovery/change-password`, { 'x-recovery-token': recoveryToken }, {password}));
    if (err) {
      console.log(`[message: Error trying to reset password with token ${recoveryToken}] [error: ${JSON.stringify(err)}]`)
      throw err;
    }
  }
}