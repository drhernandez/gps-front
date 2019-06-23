import axios from 'axios';

export default class UsersService {
  async getCurrentLocation(vehicleID) {
    try {
      // return await axios.get(`https://gps-locations-api.herokuapp.com/vehicles/${vehicle_id}/location`);
      return await new Promise(resolve => {
        setTimeout(() => {
          resolve({ "data": mock });
        }, 500);
      });
    } catch (error) {
      console.log(`Error in function getCurrentLocation. Message: ${error}`);
      return null;
    }
  }
}

const mock = {
  lat: -31.422130,
  lng: -64.186510
};