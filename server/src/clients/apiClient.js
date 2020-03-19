// const BaseClient = require("./baseClient");
// const restClient = new BaseClient('http://gps-locations-api.herokuapp.com');

// module.exports = restClient;

const fetch = require('node-fetch');

class ApiClientFecht {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(url, headers) {
    return await _execute('GET', this.baseUrl + url, headers);
  }

  async post(url, headers, body) {
    return await _execute('POST', this.baseUrl + url, headers, body);
  }

  async put(url, headers, body) {
    return await _execute('PUT', this.baseUrl + url, headers, body);
  }

  async delete(url, headers) {
    return await _execute('DELETE', this.baseUrl + url, headers);
  }
}

async function _execute(method, url, headers, body) {

  try {
    if (headers === null || headers === undefined) headers = {}
    headers['content-type'] = "application/json";

    const options = {
      method: method,
      body: body,
      headers: headers
    }

    console.log(options);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log('RESPONSEEE >>>>>>>>>>', json);
    return json;
      // .then(res => res.json())
      // .then(json => console.log(json));


    // return await restClient.request({
    //   method: method,
    //   url: url,
    //   headers: headers,
    //   data: body
    // });
  } catch (error) {
    // const err = _parseErrorResponse(error);
    // return {
    //   status: err.status,
    //   data: err
    // }
    console.log(error);
    return {
      status: 500,
      data: new Error("error")
    }
  }
}

module.exports = new ApiClientFecht('http://gps-locations-api.herokuapp.com');