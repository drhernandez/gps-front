const axios = require('axios');
const restClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000
});
restClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log(config);
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

module.exports = {
  restClient
} 