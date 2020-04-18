const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const authClient = require("../clients").AuthClient;
const logger = require("../../logger");

router.get('', async function (req, res, next) {

  const [err, response] = await to(authClient.get(`/roles`));
  if (err) {
    logger.error(`[message: Error trying to get roles list] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

module.exports = router