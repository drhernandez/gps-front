const BaseClient = require("./baseClient");
const restClient = new BaseClient('http://gps-locations-api.herokuapp.com');

module.exports = restClient;