const express = require('express');
const api = express.Router();

const task = require('./routes/task');      // Imports task routes

api.get('/', async (req, res) => {
    await res.status(200).send({
        message: 'TODO RESTful API working OK'
    })
});

//Task's CRUD operations
api.post('/tasks',task.postTask);
api.get('/tasks',task.getTasks);
api.get('/tasks/:id',task.getTaskById);
api.put('/tasks/:id',task.putTask);
api.delete('/tasks/:id',task.deleteTask);

module.exports = api;