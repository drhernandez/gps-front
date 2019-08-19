const axios = require('axios');
const restClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000
});

export default class UsersService {
  async getCurrentLocation(vehicleID) {
    try {
      const response = await restClient.get(`/vehicles/${vehicleID}/location`);
      return response.data;
    } catch (error) {
      console.log(`Error in function getCurrentLocation. Message: ${error}`);
      return null; //redirect ??
    }
  }

  async getTrackings(vehicleID) {
    try {
      const response = await restClient.get(`/vehicles/${vehicleID}/trackings`);
      return response.data;
    } catch (error) {
      console.log(`Error in function getTrackings. Message: ${error}`);
      return null; //redirect ??
    }
  }

  async getVehicleSpeedAlert(vehicleID) {
    try {
      const response = await restClient.get(`/vehicles/${vehicleID}/alerts/speed`);
      return response.data;
    } catch (error) {
      console.log(`Error in function getVehicleSpeedAlert. Message: ${error}`);
      return null; //redirect ??
    }
  }

  async getVehicleMovementAlert(vehicleID) {
    try {
      const response = await restClient.get(`/vehicles/${vehicleID}/alerts/movement`);
      return response.data;
    } catch (error) {
      console.log(`Error in function getVehicleMovementAlert. Message: ${error}`);
      return null; //redirect ??
    }
  }

  async getVehicleAlerts(vehicleID) {
    let [speed, movement] = await Promise.all([this.getVehicleSpeedAlert(vehicleID), this.getVehicleMovementAlert(vehicleID)]);
    if (speed != null && movement != null) {
      return { speed, movement }
    } else {
      console.log(`Error in function getVehicleAlerts.`);
      return null; //redirect ??
    }
  }
};