const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const authClient = require("../clients").AuthClient;
const logger = require("../../logger");

router.post('/', async (req, res, next) => {

  const body = req.body;

  const [err, response] = await to(authClient.post(`/users`, null, body));
  if (err) {
    logger.error(`[message: Error trying to create user] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/', async (req, res, next) => {

  const [err, response] = await to(authClient.get(`/users?email=${req.query.email}`));
  if (err) {
    logger.error(`[message: Error trying to find user with email: ${email}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

module.exports = router