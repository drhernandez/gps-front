import Logger from 'logdna';

const logdnaKey = process.env.REACT_APP_LOGDNA_KEY;
const options = {
  app: 'gps-front-client',
  env: process.env.NODE_ENV,
  failedBufRetentionLimit: 10000000, // bytes
  retryTimeout: 3000, // milliseconds
  retryTimes: 5
}

let __singleton;

const initializeSingleton = () => {
  if (!__singleton) {
    __singleton = process.env.NODE_ENV === 'development' ? console : Logger.createLogger(logdnaKey, options);
  }

  return __singleton;
}

export default initializeSingleton();