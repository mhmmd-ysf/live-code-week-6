const bcrypt = require('bcryptjs')

function hash(password) {
  let hashed = bcrypt.hashSync(password, 10)
  return hashed
}

module.exports = hash