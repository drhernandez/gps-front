const express = require('express')
const router = express.Router()
const to = require("await-to-js").default;
const restClient = require("../clients").ApiClient;

router.put('/speed/:id', async function (req, res) {
  
  const speedAlertId = req.params.id;
  const body = req.body;

  const [err, response] = await to(restClient.put(`/alerts/speeds/${speedAlertId}`, req.headers, body));
  if (err) {
    console.log(`[message: Error trying to update speed alert with id: ${speedAlertId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.put('/movement/:id', async function (req, res) {
  
  const movementAlertId = req.params.id;
  const body = req.body;
  
  const [err, response] = await to(restClient.put(`/alerts/movements/${movementAlertId}`, req.headers, body));
  if (err) {
    console.log(`[message: Error trying to update movement alert with id: ${movementAlertId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

module.exports = router