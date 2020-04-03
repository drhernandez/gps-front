const express = require('express');
const router = express.Router();
const to = require("await-to-js").default;
const apiClient = require("../clients").ApiClient;

router.get('/search', async (req, res, next) => {
  
  const params = Object.entries(req.query).map((entry) => `${entry[0]}=${entry[1]}`).join('&');

  const [err, response] = await to(apiClient.get(`/vehicles/search?${params}`, req.headers));
  if (err) {
    console.log(`[message: Error trying to search vehicles with query ${req.query}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

router.get('/:id/location', async (req, res, next) => {

  const [err, response] = await to(apiClient.get(`/vehicles/${req.params.id}/location`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get location for vehicle ${req.params.id}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/trackings', async (req, res, next) => {
  
  const [err, response] = await to(apiClient.get(`/vehicles/${req.params.id}/trackings`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get trackings for vehicle ${req.params.id}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/alerts/speed', async (req, res, next) => {

  const [err, response] = await to(apiClient.get(`/vehicles/${req.params.id}/alerts/speed`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get speed alert for vehicle ${req.params.id}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.get('/:id/alerts/movement', async (req, res, next) => {

  const [err, response] = await to(apiClient.get(`/vehicles/${req.params.id}/alerts/movement`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get movement alert for vehicle ${req.params.id}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.post('/', async (req, res, next) => {

  const [err, response] = await to(apiClient.post(`/vehicles`, req.headers, req.body));
  if (err) {
    console.log(`[message: Error creating new vehicle] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

router.put('/:id/activate', async (req, res, next) => {

  const [err, response] = await to(apiClient.put(`/vehicles/${req.params.id}/activate`, req.headers, req.body));
  if (err) {
    console.log(`[message: Error trying to activate vehicle ${req.params.id}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
})

router.delete('/:id', async (req, res, next) => {

  const [err, response] = await to(apiClient.delete(`/vehicles/${req.params.id}`, req.headers));
  if (err) {
    console.log(`[message: Error trying to delete vehicle ${req.params.id}] [error: ${err.message}]`);
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

  const [err, response] = await to(apiClient.get(`/brands/${req.params.id}/brandlines`, req.headers));
  if (err) {
    console.log(`[message: Error trying to get brand lines for brand: ${req.params.id}] [error: ${err.message}]`);
    res.status(500).json(err.message);
  } else {
    res.status(response.status).json(response.data);
  }
});

module.exports = router