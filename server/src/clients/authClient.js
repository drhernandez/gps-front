const BaseClient = require("./baseClient");
const restClient = new BaseClient('https://gps-auth.herokuapp.com');

module.exports = restClient;