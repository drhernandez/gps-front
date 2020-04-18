const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const authClient = require("../clients").AuthClient;
const logger = require("../../logger");

router.post('/login', async function (req, res) {
  
  const body = req.body;
  
  const [err, response] = await to(authClient.post(`/authentication/login`, null, body));
  if (err) {
    logger.error(`[message: Error trying to login] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/validate', async function(req, res) {
  
  const [err, response] = await to(authClient.post(`/authentication/validate`, req.headers));
  if (err) {
    logger.error(`[message: Error trying to validate token] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

module.exports = router;