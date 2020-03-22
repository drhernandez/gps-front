const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const apiClient = require("../clients").ApiClient;

router.get('/search', async (req, res, next) => {
  
  console.log("HEADERS >>>>>>>>>> ",req.headers)
  const params = Object.entries(req.query).map((entry) => `${entry[0]}=${entry[1]}`).join('&');

  const [err, response] = await to(apiClient.get(`/vehicles/search?${params}`, req.headers));
  if (err) {
    console.log(`[message: Error trying to search vehicles with query ${req.query}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data.data);
  }

  // res.status(200).json([
  //   {
  //     id: 15,
  //     brand: "FORD",
  //     brandline: "FIESTA KD",
  //     plate: "AA 383 TI"
  //   },
  //   {
  //     id: 25,
  //     brand: "FORD",
  //     brandline: "FIESTA KD",
  //     plate: "AA 383 TI",
  //     devicePhysicalId: "1234"
  //   }]);
})

router.get('/:id/location', async (req, res, next) => {
  
  const vehicleId = req.params.id;

  const [err, response] = await to(apiClient.get(`/vehicles/${vehicleId}/location`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get location for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/trackings', async (req, res, next) => {
  
  const vehicleId = req.params.id;

  const [err, response] = await to(apiClient.get(`/vehicles/${vehicleId}/trackings`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get trackings for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/alerts/speed', async (req, res, next) => {

  const vehicleId = req.params.id;

  const [err, response] = await to(apiClient.get(`/vehicles/${vehicleId}/alerts/speed`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get speed alert for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/alerts/movement', async (req, res, next) => {

  const vehicleId = req.params.id;

  const [err, response] = await to(apiClient.get(`/vehicles/${vehicleId}/alerts/movement`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get movement alert for vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.post('/', async (req, res, next) => {

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
  // const [err, response] = await to(apiClient.post(`/vehicles`, null, vehicle, req.headers));
  // if (err) {
  //   console.log(`[message: Error creating new vehicle] [error: ${err.message}]`);
  //   res.status(500).json(err.message);
  // } else {
  //   res.status(response.status).json(response.data);
  // }
});

router.delete('/:id', async (req, res, next) => {

  const [err, response] = await to(apiClient.delete(`/vehicles/${req.params.id}`, req.headers));
  if (err) {
    console.log(`[message: Error trying to delete vehicle ${vehicleId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

router.get('/brands', async (req, res, next) => {

  const [err, response] = await to(apiClient.get(`/brands`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get brands list] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/brands/:id/brand-lines', async (req, res, next) => {

  const brandId = req.params.id;

  const [err, response] = await to(apiClient.get(`/brands/${brandId}/brandlines`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get brand lines for brand: ${brandId}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

module.exports = router