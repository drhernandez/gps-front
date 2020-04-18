const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const authClient = require("../clients").AuthClient;
const logger = require("../../logger");

router.post('', async function (req, res) {

  const [err, response] = await to(authClient.post(`/recovery`, null, req.body));
  if (err) {
    logger.error(`[message: Error trying to generate recovery token] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

router.get('/validate', async function (req, res) {

  const [err, response] = await to(authClient.post(`/recovery/validate`, req.headers));
  if (err) {
    logger.error(`[message: Error trying to validate recovery token] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

router.put('/change-password', async function (req, res) {

  const body = req.body;
  const [err, response] = await to(authClient.put(`/recovery/change-password`, req.headers, body));
  if (err) {
    logger.error(`[message: Error trying to reset password. Rrecovery token ${req.headers['x-recovery-token']}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

module.exports = router;