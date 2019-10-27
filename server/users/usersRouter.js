const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const BaseClient = require('../baseClient');
const restClient = new BaseClient();

router.post('/', async function(req, res, next) {
  
  const body = req.body;
  
  const [err, response] = await to(restClient.post(`/users`, null, body));
  if (err) {
    console.log(`[message: Error trying to create an user] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/vehicles', async function(req, res, next) {

  const userId = req.params.id;

  const [err, response] = await to(restClient.get(`/users/${userId}/vehicles`));
  if (err) {
    console.log(`[message: Error trying to get vehicles for user ${userId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

module.exports = router