const jwt = require('jsonwebtoken')
function decodeToken(token, envSecret) {
  let decoded = jwt.verify(token, envSecret)
  return decoded
}

module.exports = decodeToken