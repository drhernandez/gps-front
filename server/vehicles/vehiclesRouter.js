const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const BaseClient = require('../baseClient');
const restClient = new BaseClient();

router.get('/:id/location', async function(req, res) {
  
  const headers = {
    "Authorization": req.header("authorization")
  }
  const vehicleId = req.params.id;

  const [err, response] = await to(restClient.get(`/vehicles/${vehicleId}/location`, headers));
  if (err) {
    console.log(`[message: Error trying to get location for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/trackings', async function(req, res) {
  
  const headers = {
    "Authorization": req.header("authorization")
  }
  const vehicleId = req.params.id;

  const [err, response] = await to(restClient.get(`/vehicles/${vehicleId}/trackings`, headers));
  if (err) {
    console.log(`[message: Error trying to get trackings for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/alerts/speed', async function(req, res) {

  const headers = {
    "Authorization": req.header("authorization")
  }
  const vehicleId = req.params.id;

  const [err, response] = await to(restClient.get(`/vehicles/${vehicleId}/alerts/speed`, headers));
  if (err) {
    console.log(`[message: Error trying to get speed alert for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

router.get('/:id/alerts/movement', async function (req, res) {

  const headers = {
    "Authorization": req.header("authorization")
  }
  const vehicleId = req.params.id;

  const [err, response] = await to(restClient.get(`/vehicles/${vehicleId}/alerts/movement`, headers));
  if (err) {
    console.log(`[message: Error trying to get movement alert for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

module.exports = router