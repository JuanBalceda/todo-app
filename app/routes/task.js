// Imports Model
const Task = require('../models/task')

// Returns API message
const apiResponse = (req, res, err, data) => {
  if (err) {
    res.status(500).send({
      message: `Server error: ${err.message}`
    })
  } else {
    if (data) {
      res.status(200).send({ data })
    } else {
      res.status(404).send({
        message: 'Not found.'
      })
    }
  }
}

// Retrieve all tasks
const getTasks = async (req, res) => {
  await Task
    .find({})
    .sort({ '_id': -1 })
    .exec((err, data) => apiResponse(req, res, err, data))
}

// Retrieve a task for a given id
const getTaskById = async (req, res) => {
  await Task
    .findById(req.params.id)
    .exec((err, data) => apiResponse(req, res, err, data))
}

// Update task for a given id
const putTask = async (req, res) => {
  await Task
    .findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, data) => apiResponse(req, res, err, data))
}

// Creates a new task
const postTask = async (req, res) => {
  let task = new Task(req.body)
  await task.save((err, data) => apiResponse(req, res, err, data))
}

// Deletes a task for a given id
const deleteTask = async (req, res) => {
  await Task
    .findByIdAndRemove(
      req.params.id,
      req.body,
      (err, data) => apiResponse(req, res, err, data))
}

module.exports = {
  getTasks,
  getTaskById,
  putTask,
  postTask,
  deleteTask
}
