const route = require('express').Router()
const User = require('../models/user')
const hash = require('../helpers/hashPassword')
const compare = require('../helpers/compareSync')
const tokenify = require('../helpers/tokenify')
const Joke = require('../models/joke')
const decodeToken = require('../helpers/decodeToken')

route.get('/', (req, res) => {
  res.status(200).json({ message: "ey" })
})

route.get('/users', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => { res.status(500).json({ err: err.message }) })
})
route.delete('/users/:id', (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then(user => {
      res.status(200).json({ message: 'done' })
    })
    .catch(err => {
      res.status(500).json({ err: err.message })
    })
})

route.post('/register', (req, res) => {
  // reqbody => email & password
  // response => _id email password
  let hashed = hash(req.body.password)
  let input = req.body
  User.findOne({ email: input.email })
    .then(found => {
      if (found) {
        res.status(401).status({ message: 'Email sudah terpakai' })
      } else {
        return User.create({
          email: input.email,
          password: hashed
        })
      }
    })
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ err: err.message })
    })
})
route.post('/login', (req, res) => {
  // reqbody => { email: 'dimitri@mail.com', password: 'secret' }
  // response => 201: { access_token: '...' }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(401).json({ message: 'user tidak ada/ password salah' })
      } else {
        if (!compare(req.body.password, user.password)) {
          res.status(401).json({ message: 'user tidak ada/ password salah' })
        } else {
          let obj = {
            email: user.email,
            password: user.password
          }
          let access_token = tokenify(obj, process.env.JWT_SECRET)
          res.status(201).json({ access_token: access_token })
        }
      }
    })
    .catch(err => {
      res.status(500).json({ err: err.message })
    })
})

route.post('/favorites', (req, res) => {
  // request body
  // { joke }
  // headers
  // { access_token }
  Joke.create(req.body)
  .then(joke => {
    let decoded = decodeToken(req.headers.access_token, process.env.JWT_SECRET)
    console.log('decoded')
    console.log(decoded)
    console.log('joke')
    console.log(joke)
    User.findOne({email: decoded.email})
    .then(found => {
      found.jokes.push(joke.id)
    })
  })
  .catch(err => {res.status(500).json({message: err.message})})
})

route.use('/*', (req, res) => {
  res.status(404).json({ message: 'Not found :(' })
})

module.exports = route