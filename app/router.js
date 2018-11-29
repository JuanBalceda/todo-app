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
    message: 'TODO RESTful API working OK',
    allowed_methods: {
      'post': {
        path: '/tasks',
        description: 'Creates a new task'
      }, 'get':
      {
        0: {
          path: '/tasks',
          description: 'Retrieve all tasks'
        },
        1: {
          path: '/tasks/:id',
          description: 'Retrieve a task for a given id'
        },
        2: {
          path: '/tasks/filter/:filter',
          description: 'Retrieve all tasks for a given keyword'
        }
      }, 'put': {
        path: '/tasks/:id',
        description: 'Updates a task for a given id'
      }, 'delete': {
        path: '/tasks/:id',
        description: 'Deletes a task for a given id'
      }
    }
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
