import Logger from 'logdna';

const apiKey = process.env.REACT_APP_LOGDNA_KEY;
const options = {
  hostname: 'dev.gps-front.herokuapp.com',
  app: 'gps-front-client',
  env: process.env.NODE_ENV,
  failedBufRetentionLimit: 10000000, // bytes
  retryTimeout: 3000, // milliseconds
  retryTimes: 0
}

const logger = Logger.createLogger(apiKey, options);

export default logger;