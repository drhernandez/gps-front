module.exports = {
  parseErrorResponse: function(error) {
    if (error.response) {
      const request = {
        "url": error.config.url,
        "method": error.config.method
      }
      const response = {
        "status": error.response.status,
        "data": error.response.data
      }
      console.error(`[MESSAGE: Invalid response executing request] [REQUEST: ${JSON.stringify(request)}] [RESPONSE: ${JSON.stringify(response)}]`);
    } else if (error.request) {
      const request = {
        "url": error.config.url,
        "method": error.config.method
      }
      console.error(`[MESSAGE: Error executing request] [REQUEST: ${JSON.stringify(request)}] [ERROR: ${error.message}]`)
    } else {
      console.error(`[MESSAGE: Unexpected error] [ERROR: ${error.message}]`);
    }
  }
}