const express = require('express')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const alertsRouter = require('../alerts/alertsRouter')
const usersRouter = require('../users/usersRouter')
const vehiclesRouter = require('../vehicles/vehiclesRouter')
const trackingsRouter = require('../trackings/trackingsRouter')
const authRouter = require('../auth/authRouter')
const recoveryRouter = require('../recovery/recoveryRouter');
const rolesRouter = require('../roles/rolesRouter');
const devicesRouter = require('../devices/devicesRouter');
const cleanHeaders = require('../middlewares/middlewares').cleanHeaders;

const server = express()

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  var cors = require('cors')
  var corsOptions = {
    origin: 'http://dev.gps-front.herokuapp.com:3000'
  }
  server.use(cors(corsOptions));
}

server.get("/ping", (req, res, next) => res.send("pong"));
server.use("/api/alerts", cleanHeaders, alertsRouter);
server.use("/api/users", cleanHeaders, usersRouter);
server.use("/api/vehicles", cleanHeaders, vehiclesRouter);
server.use("/api/trackings", cleanHeaders, trackingsRouter);
server.use("/api/auth", cleanHeaders, authRouter);
server.use("/api/recovery", cleanHeaders, recoveryRouter);
server.use("/api/roles", cleanHeaders, rolesRouter);
server.use("/api/devices", cleanHeaders, devicesRouter);

module.exports = server