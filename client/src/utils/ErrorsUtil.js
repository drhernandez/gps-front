export function parseErrorResponse(error) {
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