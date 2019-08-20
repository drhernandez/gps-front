import BaseService from './baseService';

export default class UsersService {
  constructor() {
    this.baseService = new BaseService();
  }

  async getVehiclesByUserID(userID) {
    const response = await this.baseService.get(`/users/${userID}/vehicles`);
    var data = null;
    if (response.status === 200) {
      data = response.data;
    }
    return data;
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