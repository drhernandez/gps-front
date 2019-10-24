const express = require('express');
const router = express.Router();
const BaseClient = require('../baseClient');
const restClient = new BaseClient();

router.post('/', async function(req, res, next) {
  const body = req.body;
  const response = await restClient.post(`/users`, null, body);
  res.status(response.status).json(response.data);
});

router.get('/:id/vehicles', function(req, res, next) {
  setTimeout(() => {
    res.status(200).json(mock);
  }, 500);
  // try {
  //   const response = await restClient.get(`/vehicles/${vehicleID}/location`);
  //   res.status(response.status).json(response.data);
  // } catch (error) {
  //   const response = parseErrorResponse(error);
  //   res.status(error.status).json(response);
  // }
});

module.exports = router

const mock = [
  {
    "id": 10,
    "user_id": 10,
    "device_id": 1,
    "type": "Ford Fiesta",
    "plate": "AA 383 TI",
    "model": "2018"
  },
  {
    "id": 2,
    "user_id": 10,
    "device_id": 3,
    "type": "Fiat Argo",
    "plate": "AB 112 II",
    "model": "2018"
  }
];