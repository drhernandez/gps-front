const express = require('express')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const alertsRouter = require('./alerts/alertsRouter')
const usersRouter = require('./users/usersRouter')
const vehiclesRouter = require('./vehicles/vehiclesRouter')
const authRouter = require('./auth/authRouter')
const recoverPasswordRouter = require('./recoverPassword/recoverPasswordRouter');


const app = express()
app.use(cookieParser());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));   // to support URL-encoded bodies

app.use("/alerts", alertsRouter);
app.use("/users", usersRouter);
app.use("/vehicles", vehiclesRouter);
app.use("/auth", authRouter);
app.use("/recovery", recoverPasswordRouter);

console.log('Server listening on port 3001');
app.listen(3001)