var Logger = require('logdna');

var logger;

if (process.env.NODE_ENV === 'production') {
  var options = {
    hostname: "gps-front.herokuapp.com",
    app: "gps-front",
    env: process.env.NODE_ENV
  };
  logger = Logger.createLogger(process.env.LOGDNA_KEY, options);
} else {
  logger = console
}

console.log(logger);

module.exports = logger;