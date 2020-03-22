const axios = require('axios');
const https = require('https');

class BaseClient {
  constructor(baseURL) {
    this.restClient = axios.create({
      baseURL: baseURL,
      timeout: 3000,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
  }

  async get(url, headers) {
    return await _execute(this.restClient, 'get', url, headers);
  }

  async post(url, headers, body) {
    return await _execute(this.restClient, 'post', url, headers, body);
  }

  async put(url, headers, body) {
    return await _execute(this.restClient, 'put', url, headers, body);
  }

  async delete(url, headers) {
    return await _execute(this.restClient, 'delete', url, headers);
  }
}

async function _execute(restClient, method, url, headers, body) {
  try {
    if (headers === null || headers === undefined) headers = {}
    headers['content-type'] = "application/json";
    return await restClient.request({
      method: method,
      url: url,
      headers: headers,
      data: body
    });
  } catch (error) {
    const err = _parseErrorResponse(error);
    return {
      status: err.status,
      data: err
    }
  }
}

function _parseErrorResponse(error) {
  if (error.response) {
    const request = {
      "url": error.config.url,
      "method": error.config.method
    };
    const response = {
      "status": error.response.status,
      "data": error.response.data
    };
    console.error(`[MESSAGE: Invalid response executing request] [REQUEST: ${JSON.stringify(request)}] [RESPONSE: ${JSON.stringify(response)}]`);
    return new Error(response.status || 500, response.data.error, response.data.message);
  }
  else if (error.request) {
    const request = {
      "url": error.config.url,
      "method": error.config.method
    };
    console.error(`[MESSAGE: Error executing request] [REQUEST: ${JSON.stringify(request)}] [ERROR: ${error.message}]`);
    return new Error(500, "internal_error", error.message);
  }
  else {
    console.error(`[MESSAGE: Unexpected error] [ERROR: ${error.message}]`);
    return new Error(500, "internal_error", error.message);
  }
}

class Error {
  constructor(status, errorCode, message) {
    this.status = status;
    this.errorCode = errorCode;
    this.message = message;
  }
}

module.exports = BaseClient
