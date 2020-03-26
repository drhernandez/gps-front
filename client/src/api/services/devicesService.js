import BaseService from './baseService';
import to from "await-to-js";
const restClient = new BaseService();

export default class DevicesService {

  static async getDeviceById(deviceId) {
    const [err, response] = await to(restClient.get(`/devices/${deviceId}`));
    if (err) {
      console.log(`[message: Error getting device ${deviceId}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }
};