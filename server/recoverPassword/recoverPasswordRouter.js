const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const BaseClient = require('../baseClient');
const restClient = new BaseClient();

router.get('/:id/validate', async function (req, res) {

  const recoveryId = req.params.id;
  setTimeout(() => {
    res.status(200).end();
  }, 1000);
  // const [err, response] = await to(restClient.get(`/recovery/${recoveryId}/validate`));
  // if (err) {
  //   console.log(`[message: Error trying to validate password recovery id ${recoveryId}] [error: ${err.message}]`);
  //   res.status(500).json(err.message);
  // } else {
  //   res.status(response.status).json(response.data);
  // }
})

router.put('/:id', async function (req, res) {

  const recoveryId = req.params.id;
  const body = req.body;
  setTimeout(() => {
    res.status(200).end();
  }, 2000);
  // const [err, response] = await to(restClient.put(`/recovery/${recoveryId}`, null, body));
  // if (err) {
  //   console.log(`[message: Error trying to reset password with recovery id ${recoveryId}] [error: ${err.message}]`);
  //   res.status(500).json(err.message);
  // } else {
  //   res.status(response.status).json(response.data);
  // }
})

module.exports = router;