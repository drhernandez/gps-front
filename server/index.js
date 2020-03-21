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
const recoverPasswordRouter = require('./src/recoverPassword/recoverPasswordRouter');
const rolesRouter = require('./src/roles/rolesRouter');

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

app.get("/ping", (req, res, next) => "pong");
app.use("/alerts", alertsRouter);
app.use("/users", usersRouter);
app.use("/vehicles", vehiclesRouter);
app.use("/auth", authRouter);
app.use("/recovery", recoverPasswordRouter);
app.use("/roles", rolesRouter);

console.log('Server listening on port 3001');
app.listen(3001)