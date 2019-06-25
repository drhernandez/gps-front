// import axios from 'axios';

export default class UsersService {
  async getVehiclesByUserID(userID) {
    try {
      // return await axios.get(`https://gps-locations-api.herokuapp.com/users/${userID}/vehicles`);
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ "status": 200, "data": mock});
        }, 500);
      });
      if (response.status !== 200) {
        console.log(response);
        return []
      }
      return response.data;
    
    } catch (error) {
      console.log(`Error in function getDevicesByUserID. Message: ${error}`);
      return [];
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