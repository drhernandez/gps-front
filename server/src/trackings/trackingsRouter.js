const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const apiClient = require("../clients").ApiClient;

router.get('/search', async (req, res, next) => {

  const params = Object.entries(req.query).map((entry) => `${entry[0]}=${entry[1]}`).join('&');
  const [err, response] = await to(apiClient.get(`/trackings/search?${params}`, req.headers));
  if (err) {
    console.error(`[message: Error trying to search trackings with query ${req.query}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

module.exports = router