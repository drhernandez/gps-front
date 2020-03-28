const allowedHeaders = [
  'x-access-token',
  'x-recovery-token'
]

const cleanHeaders = (req, res, next) => {
  const headers = {};

  allowedHeaders.forEach((header) => {
    if (req.headers[header]) {
      headers[header] = req.headers[header];
    }
  })

  req.headers = headers;
  next();
}

module.exports = {
  cleanHeaders
}