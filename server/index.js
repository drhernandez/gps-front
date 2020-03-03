const express = require('express')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const alertsRouter = require('./src/alerts/alertsRouter')
const usersRouter = require('./src/users/usersRouter')
const vehiclesRouter = require('./src/vehicles/vehiclesRouter')
const authRouter = require('./src/auth/authRouter')
const recoverPasswordRouter = require('./src/recoverPassword/recoverPasswordRouter');


const app = express()
app.use(cookieParser());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));   // to support URL-encoded bodies
app.use(function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict'
  });
  next();
});

app.use("/alerts", alertsRouter);
app.use("/users", usersRouter);
app.use("/vehicles", vehiclesRouter);
app.use("/auth", authRouter);
app.use("/recovery", recoverPasswordRouter);

console.log('Server listening on port 3001');
app.listen(3001)