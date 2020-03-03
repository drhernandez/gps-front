const BaseClient = require("./baseClient");
const restClient = new BaseClient('http://gps-auth.herokuapp.com');

module.exports = restClient;