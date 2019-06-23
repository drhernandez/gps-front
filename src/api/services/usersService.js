import axios from 'axios';

export default class UsersService {
  async getVehiclesByUserID(userID) {
    try {
      // return await axios.get(`https://gps-locations-api.herokuapp.com/users/${userID}/vehicles`);
      return await new Promise(resolve => {
        setTimeout(() => {
          resolve({"data": mock});
        }, 500);
      });
    } catch (error) {
      console.log(`Error in function getDevicesByUserID. Message: ${error}`);
      return null;
    }
  }
}

const mock = [
  {
    "id": 10,
    "user_id": 10,
    "device_id": 1,
    "type": "Ford Fiesta",
    "plate": "AA 383 TI",
    "model": "2018"
  },
  {
    "id": 2,
    "user_id": 10,
    "device_id": 3,
    "type": "Fiat Argo",
    "plate": "AB 112 II",
    "model": "2018"
  }
];