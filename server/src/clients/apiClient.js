const BaseClient = require("./baseClient");
const restClient = new BaseClient(process.env.CORE_API_BASE_URL);

module.exports = restClient;