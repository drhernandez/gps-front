const cleanHeaders = (req, res, next) => {
  const headers = {};
  if (req.headers['x-access-token']) {
    headers['x-access-token'] = req.headers['x-access-token'];
  }

  req.headers = headers;
  next();
}

module.exports = {
  cleanHeaders
}