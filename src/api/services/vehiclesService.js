// import axios from 'axios';

export default class UsersService {
  async getCurrentLocation(vehicleID) {
    try {
      // return await axios.get(`https://gps-locations-api.herokuapp.com/vehicles/${vehicle_id}/location`);
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ "status": 200, "data": vehicleID === "10" ? mock1 : mock2 });
        }, 500);
      });
      if (response.status !== 200) {
        console.log(response);
        return []
      }
      return response.data;

    } catch (error) {
      console.log(`Error in function getCurrentLocation. Message: ${error}`);
      return [];
    }
  }
}

const mock1 = {
  id: 10,
  position: {
    lat: -31.422130,
    lng: -64.186510
  }
};

const mock2 = {
  id: 2,
  position: {
    lat: -31.368731,
    lng: -64.201752
  }
};