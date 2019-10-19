const express = require('express')
const router = express.Router()

router.post('/login', function (req, res) {
  setTimeout(() => {
    res.status(200).json(mock);
  }, 500);
  // try {
  //   const email = req.body.email;
  //   const password = req.bodu.password;
  //   const response = await restClient.post(`/auth/login`, {email, password});
  //   res.status(response.status).json(response.data);
  // } catch (error) {
  //   const response = parseErrorResponse(error);
  //   res.status(response.status).json(response);
  // }
});

router.get('/validate', function(req, res) {
  setTimeout(() => {
    res.status(200).send();
  }, 500);
})

module.exports = router

const mock = {
  token: 'eyJ0eXBlIjoiYWNjZXNzLXRva2VuIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJVc2VyIiwiZXhwIjoxNTY1NjU5MzE0LCJpYXQiOjE1NjU2NTkzMDQsInVzZXJJZCI6MSwidXNlck5hbWUiOiJOaWNvbGFzIiwidXNlckxhc3ROYW1lIjoiQ2FyZ25lbHV0dGkiLCJ1c2VyRW1haWwiOiJuZWNhcmduZWx1dHRpQGdtYWlsLmNvbSJ9.brpz6niyZd0jODUjUKL9_YU5nE0vG4ZI3r2PraZvlXA'
}