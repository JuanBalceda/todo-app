const env = require('./config/env') // Imports environment variables
const database = require('./config/database') // Loads database configuration

// Starts the app with express
const express = require('express')
const app = express()

// Allows handling multipart/form-data
const multer = require('multer')
const upload = multer()

// Imports routes
const router = require('./app/router')

app.set('port', process.env.PORT)
  .set('useCreateIndex', true)
// For parsing JSON
  .use(express.json())
// For parsing application/xwww-form-urlencode
  .use(express.urlencoded({ extended: false }))
// For parsing multipart/form-data
  .use(upload.array())
// Enables CORS
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    next()
  })
  .use('/v1', router)

app.listen(
  app.get('port'),
  () => console.log(`Starting RESTful API... Listening on port: ${app.get('port')} `)
)
