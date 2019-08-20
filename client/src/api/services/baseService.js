const axios = require('axios');

export default class BaseService {
  constructor() {
    this.restClient = axios.create({
      baseURL: 'http://localhost:3001',
      timeout: 1000
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
    return await restClient.request({
      method: method,
      url: url,
      headers: headers,
      data: body
    });
  } catch (error) {
    return _parseErrorResponse(error);
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
    const data = JSON.parse(error.response.data);
    return new Error(data.status = 500, data.error, data.message);
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
    this.message = message;
    this.errorCode = errorCode;
  }
}

