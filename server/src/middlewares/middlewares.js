const cleanHeaders = (req, res, next) => {
  req.headers = {
    'x-access-token': req.headers['x-access-token']
  };
  next();
}

module.exports = {
  cleanHeaders
}