const mongoose = require('mongoose')

JokeSchema = new mongoose.Schema({
  joke: String
})

let Joke = mongoose.model('Joke', JokeSchema)

module.exports = Joke