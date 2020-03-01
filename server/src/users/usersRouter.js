const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const restClient = require("../clients").AuthClient;

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

module.exports = router