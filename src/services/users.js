class UsersService {
  async getDevicesByUserID(userID) {
    try {
      // return await axios.get(`http://localhost:8081/users/${userID}/devices`);
      return await new Promise(resolve => {
        setTimeout(() => {
          resolve([{ value: 1, label: 'Ford' }, { value: 2, label: 'Toyota' }]);
        }, 500);
      });
    } catch (error) {
      console.log(`Error in function getDevicesByUserID. Message: ${error}`);
      return null;
    }
  }
}

module.exports = UsersService;
