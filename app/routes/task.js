// Imports Model
const Task = require('../models/task')

async function validateUser (username, taskId) {
  let task = {}
  try {
    task = await Task.findById(taskId)
    if (task.who === username) {
      return true
    }
  } catch (e) {
    return false
  }
  return false
}

// Retrieve all tasks of the user
const getTasks = async (req, res) => {
  const { user } = req

  if (!user || !user.username) {
    res.status(401).send({ message: 'Not authorized.' })
  }

  let tasks = []
  try {
    tasks = await Task.find({ who: user.username }).sort({ '_id': -1 })

    if (!tasks || tasks.length === 0) {
      res.status(200).send({ message: 'There are no tasks.' })
    } else {
      res.status(200).send({ tasks })
    }
  } catch (e) {
    res.status(500).send({ message: `Server error: ${e.message}` })
  }
}

// Retrieve a task for a given id
const getTaskById = async (req, res) => {
  const { user } = req

  if (!user || !user.username) {
    res.status(401).send({ message: 'Not authorized.' })
  }

  let task = {}
  try {
    task = await Task.findById(req.params.id)
    if (!task) {
      res.status(200).send({ message: `There is no task with id: ${req.params.id}` })
    } else if (task.who === user.username) {
      res.status(200).send({ task })
    } else {
      res.status(401).send({ message: 'Not authorized.' })
    }
  } catch (e) {
    if (e.message.match(/Cast to ObjectId failed/)) {
      res.status(400).send({ message: `Please verify that id: ${req.params.id} is a valid id.` })
    } else {
      res.status(500).send({ message: `Server error: ${e.message}` })
    }
  }
}

// Update task for a given id
const putTask = async (req, res) => {
  const { user } = req

  if (!user || !user.username) {
    res.status(401).send({ message: 'Not authorized.' })
  }

  let task
  try {
    if (await validateUser(user.username, req.params.id)) {
      task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    } else {
      res.status(401).send({ message: 'Not authorized.' })
    }
    if (!task) {
      res.status(200).send({ message: `There is no task with id: ${req.params.id}` })
    } else {
      res.status(200).send({ task })
    }
  } catch (e) {
    if (e.message.match(/Cast to ObjectId failed/)) {
      res.status(400).send({ message: `Please verify that id: ${req.params.id} is a valid id.` })
    } else {
      res.status(500).send({ message: `Server error: ${e.message}` })
    }
  }
}

// Creates a new task
const postTask = async (req, res) => {
  const { user } = req

  if (!user || !user.username) {
    res.status(401).send({ message: 'Not authorized.' })
  }

  let task = new Task(req.body)
  if (task.task) {
    task.who = user.username
    try {
      await task.save((err, data) => {
        if (err) {
          res.status(500).send({ message: `Server error: ${err.message}` })
        }
        res.status(200).send({ data })
      })
    } catch (e) {
      res.status(500).send({ message: `Server error: ${e.message}` })
    }
  } else {
    res.status(500).send({ message: `Server error: Cannot save empty object` })
  }
}

// Deletes a task for a given id
const deleteTask = async (req, res) => {
  const { user } = req

  if (!user || !user.username) {
    res.status(401).send({ message: 'Not authorized.' })
  }

  let task
  try {
    if (await validateUser(user.username, req.params.id)) {
      task = await Task.findByIdAndRemove(req.params.id, req.body)
    } else {
      res.status(401).send({ message: 'Not authorized.' })
    }

    if (!task) {
      res.status(200).send({ message: `There is no task with id: ${req.params.id}` })
    } else {
      res.status(200).send({ task })
    }
  } catch (e) {
    if (e.message.match(/Cast to ObjectId failed/)) {
      res.status(400).send({ message: `Please verify that id: ${req.params.id} is a valid id.` })
    } else {
      res.status(500).send({ message: `Server error: ${e.message}` })
    }
  }
}

module.exports = {
  getTasks,
  getTaskById,
  putTask,
  postTask,
  deleteTask
}
