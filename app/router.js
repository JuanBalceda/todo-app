const express = require('express');
const api = express.Router();

api.get('/', async (req, res) => {
    await res.status(200).send({
        message: 'TODO RESTful API working OK'
    })
});

module.exports = api