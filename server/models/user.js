const mongoose = require('mongoose')

UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  jokes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joke'
  }]
})

let User = mongoose.model('User', UserSchema)

module.exports = User