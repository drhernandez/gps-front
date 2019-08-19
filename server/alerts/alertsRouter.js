const express = require('express')
const router = express.Router()

router.put('/speed/:id', function (req, res) {
  setTimeout(() => {
    res.status(200).send();
  }, 500);
  // try {
  //   const response = await restClient.get(`/vehicles/${vehicleID}/location`);
  //   res.status(response.status).json(response.data);
  // } catch (error) {
  //   const response = parseErrorResponse(error);
  //   res.status(response.status).json(response);
  // }
});

router.put('/movement/:id', function (req, res) {
  setTimeout(() => {
    res.status(200).send();
  }, 500);
});

module.exports = router