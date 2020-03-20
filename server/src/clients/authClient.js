const BaseClient = require("./baseClient");
const restClient = new BaseClient(process.env.AUTH_API_BASE_URL);

module.exports = restClient;