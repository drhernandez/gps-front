import BaseService from './baseService';
import to from "await-to-js";
import { DevicesService } from "./index";
const restClient = new BaseService();

export default class VehiclesService {

  static async searchVehicles(userID) {
    const [err, response] = await to(restClient.get(`/vehicles/search?user_id=${userID}`));
    if (err) {
      console.log(`[message: Error getting vehicles info for user ${userID}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    if (response.data.paging.total) {

      let devices = await Promise.all(
        response.data.data
          .filter(vehicle => vehicle.status === 'ACTIVE')
          .map(vehicle => DevicesService.getDeviceById(vehicle.device_id))
      );

      response.data.data
        .filter(vehicle => vehicle.status === 'ACTIVE')
        .forEach(vehicle => {
          vehicle.device = devices.find(device => device.id == vehicle.device_id);
          delete vehicle.device_id
        });

    }
    
    return response.data;
  }

  static async createVehicle(vehicle) {
    const [err, response] = await to(restClient.post(`/vehicles`, null, vehicle));
    if (err) {
      console.log(`[message: Error creating new vehicle] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }
  
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
    const [err, alerts] = await to(Promise.all(
      [this.getVehicleSpeedAlert(vehicleID), this.getVehicleMovementAlert(vehicleID)])
    );
    if (err) {
      console.log(`[message: Error getting alerts for vehiclie: ${vehicleID}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    const [speed, movement] = alerts

    return { speed, movement }
  }

  static async activate(vehicleId, physicalId) {

    const [err, response] = await to(restClient.put(`/vehicles/${vehicleId}/activate`, null, { physical_id: physicalId }));
    if (err) {
      console.log(`[message: Error activating vehicle ${vehicleId}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    const [err2, device] = await to(DevicesService.getDeviceById(response.data.device_id));
    if (err) {
      console.log(`[message: Error trying to get device ${response.data.device_id} after activating vehicle ${vehicleId}] [error: ${JSON.stringify(err2)}]`);
      throw err2;
    }

    delete response.data.device_id;
    response.data.device = device;

    return response.data;
  }

  static async deleteVehicle(vehicleId) {
    const [err, response] = await to(restClient.delete(`/vehicles/${vehicleId}`));
    if (err) {
      console.log(`[message: Error deleting vehicle ${vehicleId}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }

  static async getBrands() {
    const [err, response] = await to(restClient.get(`/vehicles/brands`));
    if (err) {
      console.log(`[message: Error getting brands list] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }

  static async getBrandLines(brandId) {
    const [err, response] = await to(restClient.get(`/vehicles/brands/${brandId}/brand-lines`));
    if (err) {
      console.log(`[message: Error getting brand lines for brand: ${brandId}] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return response.data;
  }
};