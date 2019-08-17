const axios = require('axios');
const express = require('express')
const router = express.Router()

router.get('/:id/vehicles', function(req, res, next) {
  setTimeout(() => {
    res.status(200).json(mock);
  }, 500);
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