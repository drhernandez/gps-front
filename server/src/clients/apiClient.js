const BaseClient = require("./baseClient");
const restClient = new BaseClient('https://gps-locations-api.herokuapp.com');

module.exports = restClient;