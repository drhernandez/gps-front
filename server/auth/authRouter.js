const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const BaseClient = require('../baseClient');
const restClient = new BaseClient();

router.post('/login', async function (req, res) {
  
  const body = req.body;
  const [err, response] = await to(restClient.post(`/auth/login`, null, body));
  if (err) {
    console.log(`[message: Error trying to login] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/validate', async function(req, res) {
  
  const headers = {
    "Authorization": req.header("authorization")
  }
  const [err, response] = await to(restClient.get(`/auth/validate`, headers));
  if (err) {
    console.log(`[message: Error trying to validate token] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

module.exports = router;