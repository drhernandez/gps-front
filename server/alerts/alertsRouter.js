const axios = require('axios');
const express = require('express')
const router = express.Router()

router.put('/speed/:id', function (req, res) {
  
  const id = req.params.id;
  const body = req.body;
  console.log("id: ", id);
  console.log("body: ", req.body);
  setTimeout(() => {
    res.status(200).send();
  }, 500);
});

router.put('/movement/:id', function (req, res) {

  const id = req.params.id;
  const body = req.body;
  console.log("id: ", id);
  console.log("body: ", req.body);
  setTimeout(() => {
    res.status(200).send();
  }, 500);
});

module.exports = router