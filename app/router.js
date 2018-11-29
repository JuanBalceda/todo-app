const express = require('express')
const api = express.Router()
const config = require('../config/env')

// Imports jwt functions
const auth = require('express-jwt')

// Imports task routes
const task = require('./routes/task')

// Root Endpoint
api.get('/', async (req, res) => {
  await res.status(200).send({
    message: 'TODO RESTful API working OK'
  })
})

// Task's CRUD operations
api.post('/tasks', auth(config.auth), task.postTask)
api.get('/tasks', auth(config.auth), task.getTasks)
api.get('/tasks/:id', auth(config.auth), task.getTaskById)
api.get('/tasks/filter/:filter', auth(config.auth), task.getTaskByFilter)
api.put('/tasks/:id', auth(config.auth), task.putTask)
api.delete('/tasks/:id', auth(config.auth), task.deleteTask)

module.exports = api
