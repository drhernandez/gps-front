const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const authClient = require("../clients").AuthClient;
const apiClient = require("../clients").ApiClient;

router.post('/', async function(req, res, next) {
  
  const body = req.body;
  
  const [err, response] = await to(authClient.post(`/users`, null, body));
  if (err) {
    console.log(`[message: Error trying to create an user] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:userId/vehicles', async function (req, res, next) {

  const userId = req.params.userId;

  // const [err, response] = await to(apiClient.get(`/users/${userId}/vehicles`, req.headers));
  const [err, response] = await to(apiClient.get(`/vehicles`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get vehicles for user ${userId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

module.exports = router