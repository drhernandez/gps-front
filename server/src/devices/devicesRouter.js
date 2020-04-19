const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const apiClient = require("../clients").ApiClient;

router.get('/:id', async (req, res, next) => {

  const [err, response] = await to(apiClient.get(`/devices/${req.params.id}`, req.headers));
  if (err) {
    console.error(`[message: Error trying to get device ${req.params.id}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

module.exports = router