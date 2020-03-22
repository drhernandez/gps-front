// const BaseClient = require("./baseClient");
// const restClient = new BaseClient(process.env.AUTH_API_BASE_URL);

// module.exports = restClient;

export class AuthClient {

  async get(url, headers) {
    return {status: 200, data: {}};
  }

  async post(url, headers, body) {
    return {status: 200, data: {}};
  }

  async put(url, headers, body) {
    return {status: 200, data: {}};
  }

  async delete(url, headers) {
    return {status: 200, data: {}};
  }
} 