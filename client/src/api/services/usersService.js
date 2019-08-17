const axios = require('axios');
const restClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000
});
const { parseErrorResponse } = require('../../utils/ErrorsUtil')

export default class UsersService {
  async getVehiclesByUserID(userID) {
    
    try {
      const response = await restClient.get(`/users/${userID}/vehicles`);
      return response.data;

    } catch (error) {
      parseErrorResponse(error);
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