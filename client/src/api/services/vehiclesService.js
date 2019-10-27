import BaseService from './baseService';
import to from "await-to-js";
const restClient = new BaseService();

export default class VehiclesService {
  
  static async getCurrentLocation(vehicleID) {
    const [err, response] = await to(restClient.get(`/vehicles/${vehicleID}/location`));
    if (err) {
      console.log(`[message: Error getting current location for vehiclie: ${vehicleID}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }

  static async getTrackings(vehicleID) {
    const [err, response] = await to(restClient.get(`/vehicles/${vehicleID}/trackings`));
    if (err) {
      console.log(`[message: Error getting trackings for vehiclie: ${vehicleID}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }

  static async getVehicleSpeedAlert(vehicleID) {
    const [err, response] = await to(restClient.get(`/vehicles/${vehicleID}/alerts/speed`));
    if (err) {
      console.log(`[message: Error getting speed alert for vehiclie: ${vehicleID}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }

  static async getVehicleMovementAlert(vehicleID) {
    const [err, response] = await to(restClient.get(`/vehicles/${vehicleID}/alerts/movement`));
    if (err) {
      console.log(`[message: Error getting movement alert for vehiclie: ${vehicleID}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }

  static async getVehicleAlerts(vehicleID) {
    const [err, [speed, movement]] = await to(Promise.all(
      [this.getVehicleSpeedAlert(vehicleID), this.getVehicleMovementAlert(vehicleID)])
    );
    if (err) {
      console.log(`[message: Error getting alerts for vehiclie: ${vehicleID}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return { speed, movement }
  }
};