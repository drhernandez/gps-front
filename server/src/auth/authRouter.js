const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const authClient = require("../clients").AuthClient;

router.post('/login', async function (req, res) {
  
  const body = req.body;
  
  const [err, response] = await to(authClient.post(`/authentication/login`, null, body));
  if (err) {
    console.log(`[message: Error trying to login] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/validate', async function(req, res) {
  
  // const [err, response] = await to(authClient.post(`/authentication/validate`, req.headers));
  // if (err) {
  //   console.log(`[message: Error trying to validate token] [error: ${err.message}]`);
  //   res.status(500).json(err.message);
  // } else {
  //   res.status(response.status).json(response.data);
  // }
  res.status(200).send();
})

module.exports = router;