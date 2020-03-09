const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const apiClient = require("../clients").ApiClient;

router.get('/:id/location', async function(req, res) {
  
  const vehicleId = req.params.id;

  const [err, response] = await to(apiClient.get(`/vehicles/${vehicleId}/location`));
  if (err) {
    console.log(`[message: Error trying to get location for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/trackings', async function(req, res) {
  
  const vehicleId = req.params.id;

  const [err, response] = await to(apiClient.get(`/vehicles/${vehicleId}/trackings`));
  if (err) {
    console.log(`[message: Error trying to get trackings for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/alerts/speed', async function(req, res) {

  const vehicleId = req.params.id;

  const [err, response] = await to(apiClient.get(`/vehicles/${vehicleId}/alerts/speed`));
  if (err) {
    console.log(`[message: Error trying to get speed alert for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/alerts/movement', async function (req, res) {

  const vehicleId = req.params.id;

  const [err, response] = await to(apiClient.get(`/vehicles/${vehicleId}/alerts/movement`));
  if (err) {
    console.log(`[message: Error trying to get movement alert for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.post('/', async function (req, res) {

  setTimeout(() => {
    res.status(201).json({
      id: 1,
      status: "INACTIVE",
      deleted_at: null,
      last_updated: null,
      user_id: 1,
      device_id: null,
      type: 'FORD',
      model: 'FIESTA',
      plate: 'AA 383 TI'
    });
  }, 500);

  // const vehicle = req.body;
  // console.log(vehicle);
  // const [err, response] = await to(apiClient.post(`/vehicles`, null, vehicle));
  // if (err) {
  //   console.log(`[message: Error creating new vehicle] [error: ${err.message}]`);
  //   res.status(500).json(err.message);
  // } else {
  //   res.status(response.status).json(response.data);
  // }
});

router.delete('/:id', async function (req, res) {

  setTimeout(() => {
    res.status(204).send();
  }, 3000);

  // const vehicleId = req.params.id;

  // const [err, response] = await to(apiClient.delete(`/vehicles/${vehicleId}`));
  // if (err) {
  //   console.log(`[message: Error trying to delete vehicle ${vehicleId}] [error: ${err.message}]`);
  //   res.status(500).json(err.message);
  // } else {
  //   res.status(response.status).json(response.data);
  // }
})

router.get('/brands', async function (req, res) {

  const [err, response] = await to(apiClient.get(`/brands`));
  if (err) {
    console.log(`[message: Error trying to get brands list] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/brands/:id/brand-lines', async function (req, res) {

  const brandId = req.params.id;

  const [err, response] = await to(apiClient.get(`/brands/${brandId}/brandlines`));
  if (err) {
    console.log(`[message: Error trying to get brand lines for brand: ${brandId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

module.exports = router