var express = require('express')
var router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
router.put('/:id', function (req, res) {
  
  res.send('Alerts home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About alerts')
})

module.exports = router