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
