const jwt = require('jsonwebtoken')

function tokenify(inputObj, jwtSecret) {
  let token = jwt.sign(inputObj, jwtSecret)
  return token
}

module.exports = tokenify