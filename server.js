// Setup and Imports
const express = require('express');
const app = express();                              // Starts the app with express

const env = require('./config/env');                // Imports environment variables
const database = require('./config/database');      // Loads database configuration

const multer = require('multer');                   // Allows handling multipart/form-data
const upload = multer();

const router = require('./app/router');             // Imports routes

app.set('port', process.env.PORT)
    .set('useCreateIndex', true)
    .use(express.json())                            // For parsing JSON
    .use(express.urlencoded({ extended: false }))   // For parsing application/xwww-form-urlencode
    .use(upload.array())                            // For parsing multipart/form-data
    .use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        next();
    })                                              // Enables CORS
    .use('/v1', router);

app.listen(
    app.get('port'),
    () => console.log(`Starting RESTful API... Listening on port: ${app.get('port')} `)
);