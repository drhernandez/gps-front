const express = require('express')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const alertsRouter = require('./alerts/alertsRouter')
const usersRouter = require('./users/usersRouter')
const vehiclesRouter = require('./vehicles/vehiclesRouter')
const authRouter = require('./auth/authRouter')


const app = express()
app.use(cookieParser());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));   // to support URL-encoded bodies

app.use("/alerts", (req, res, next) => {
  console.log("AUTH: ", req.header("authorization"));
  next();
}, alertsRouter);
app.use("/users", (req, res, next) => {
  console.log("AUTH: ", req.header("authorization"));
  next();
}, usersRouter);
app.use("/vehicles", (req, res, next) => {
  console.log("AUTH: ", req.header("authorization"));
  next();
}, vehiclesRouter);
app.use("/auth", (req, res, next) => {
  console.log("AUTH: ", req.header("authorization"));
  next();
}, authRouter);

console.log('Server listening on port 3001');
app.listen(3001)