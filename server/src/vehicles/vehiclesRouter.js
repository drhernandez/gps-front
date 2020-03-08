const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const apiClient = require("../clients").ApiClient;

router.get('/:id/location', async function(req, res) {
  
  const vehicleId = req.params.id;

  const [err, response] = await to(apiClient.get(`/vehicles/${vehicleId}/location`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get location for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/trackings', async function(req, res) {
  
  const vehicleId = req.params.id;

  const [err, response] = await to(apiClient.get(`/vehicles/${vehicleId}/trackings`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get trackings for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/alerts/speed', async function(req, res) {

  const vehicleId = req.params.id;

  const [err, response] = await to(restClient.get(`/vehicles/${vehicleId}/alerts/speed`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get speed alert for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

router.get('/:id/alerts/movement', async function (req, res) {

  const vehicleId = req.params.id;

  const [err, response] = await to(restClient.get(`/vehicles/${vehicleId}/alerts/movement`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get movement alert for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

module.exports = router