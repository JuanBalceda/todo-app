const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Defining model through Schema interface
const TaskSchema = new Schema({
  task: {
    type: String,
    require: [true, 'Name is required']
  },
  who: String,
  created: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  done: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Task', TaskSchema)
