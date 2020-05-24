if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const alertsRouter = require('./src/alerts/alertsRouter')
const usersRouter = require('./src/users/usersRouter')
const vehiclesRouter = require('./src/vehicles/vehiclesRouter')
const authRouter = require('./src/auth/authRouter')
const recoveryRouter = require('./src/recovery/recoveryRouter');
const rolesRouter = require('./src/roles/rolesRouter');
const devicesRouter = require('./src/devices/devicesRouter');
const cleanHeaders = require('./src/middlewares/middlewares').cleanHeaders;

const app = express()

app.use(cookieParser());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));   // to support URL-encoded bodies

if (process.env.NODE_ENV === 'development') {
  var cors = require('cors')
  var corsOptions = {
    origin: 'http://dev.gps-front.herokuapp.com:3000'
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));
}

app.get("/ping", (req, res, next) => res.send("pong"));
app.use("/api/alerts", cleanHeaders, alertsRouter);
app.use("/api/users", cleanHeaders, usersRouter);
app.use("/api/vehicles", cleanHeaders, vehiclesRouter);
app.use("/api/auth", cleanHeaders, authRouter);
app.use("/api/recovery", cleanHeaders, recoveryRouter);
app.use("/api/roles", cleanHeaders, rolesRouter);
app.use("/api/devices", cleanHeaders, devicesRouter);

console.log('Server listening on port 3001');
app.listen(3001)