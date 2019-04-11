const bcrypt = require('bcryptjs')

function compare(inputPassword, dbPassword) {
  return bcrypt.compareSync(inputPassword, dbPassword)
}

module.exports = compare