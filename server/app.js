require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const route = require('./routes')
const port = 3000
const cors = require('cors')
let mongoose = require('mongoose')
let db = 'mongodb://localhost:27017/classic_fox_live_code_1'

mongoose.connect(db, {useNewUrlParser: true})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use('/', route)

app.listen(port, () => {console.log(`Listening on port ${port}!`)})