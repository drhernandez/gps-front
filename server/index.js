const express = require('express')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const alertsRouter = require('./alerts/alertsRouter')
const usersRouter = require('./users/usersRouter')
const vehiclesRouter = require('./vehicles/vehiclesRouter')


const app = express()
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use("/alerts", alertsRouter);
app.use("/users", usersRouter);
app.use("/vehicles", vehiclesRouter);

app.listen(3000)