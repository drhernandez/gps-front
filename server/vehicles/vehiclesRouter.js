const axios = require('axios');
const express = require('express')
const router = express.Router()

router.get('/:id/location', function(req, res) {
  const id = req.params.id;
  setTimeout(() => {
    res.status(200).json(id === "10" ? mock1 : mock2);
  }, 500);
});

router.get('/:id/trackings', function(req, res) {
  setTimeout(() => {
    res.status(200).json((heatMapmock));
  }, 500);
});

router.get('/:id/alerts/speed', function(req, res) {
  const id = req.params.id;
  setTimeout(() => {
    res.status(200).json(id === 10 ? speedAlertMock_10 : speedAlertMock_2);
  }, 500);
})

router.get('/:id/alerts/movement', function (req, res) {
  const id = req.params.id;
  setTimeout(() => {
    res.status(200).json(id === 10 ? movementAlertMock_10 : movementAlertMock_2);
  }, 500);
})

module.exports = router


const mock1 = {
  id: 10,
  lat: -31.422130,
  lng: -64.186510
};

const mock2 = {
  id: 2,
  lat: -31.368731,
  lng: -64.201752
};

const heatMapmock = [
  { lat: -31.422108, lng: -64.186429 },
  { lat: -31.422218, lng: -64.185785 },
  { lat: -31.422731, lng: -64.184842 },
  { lat: -31.422841, lng: -64.183941 },
  { lat: -31.423097, lng: -64.183512 },
  { lat: -31.423015, lng: -64.183206 },
  { lat: -31.423108, lng: -64.183062 },
  { lat: -31.423136, lng: -64.182994 },
  { lat: -31.423159, lng: -64.182929 },
  { lat: -31.423182, lng: -64.182865 },
  { lat: -31.423269, lng: -64.182629 },
  { lat: -31.422953, lng: -64.182511 },
  { lat: -31.422761, lng: -64.182436 },
  { lat: -31.422338, lng: -64.182310 },
  { lat: -31.421972, lng: -64.182160 },
  { lat: -31.421729, lng: -64.182367 },
  { lat: -31.421665, lng: -64.182646 },
  { lat: -31.421546, lng: -64.183096 },
  { lat: -31.421482, lng: -64.183482 },
  { lat: -31.421381, lng: -64.183772 },
  { lat: -31.421271, lng: -64.184083 },
  { lat: -31.421198, lng: -64.184394 },
  { lat: -31.421088, lng: -64.184866 },
  { lat: -31.420997, lng: -64.185188 },
  { lat: -31.420914, lng: -64.185617 },
  { lat: -31.420859, lng: -64.185874 },
  { lat: -31.420951, lng: -64.186110 },
  { lat: -31.421180, lng: -64.186207 },
  { lat: -31.421381, lng: -64.186250 },
  { lat: -31.421519, lng: -64.186357 },
  { lat: -31.421665, lng: -64.186422 },
  { lat: -31.421793, lng: -64.186422 },
  { lat: -31.421921, lng: -64.186508 },
  { lat: -31.422068, lng: -64.186497 }
];

const speedAlertMock_10 = {
  id: 1,
  active: true,
  speed: 100,
  deviceId: 1
};

const speedAlertMock_2 = {
  id: 2,
  active: false,
  deviceId: 3
};

const movementAlertMock_10 = {
  id: 1,
  active: false,
  deviceId: 1
};

const movementAlertMock_2 = {
  id: 2,
  active: true,
  deviceId: 3
};