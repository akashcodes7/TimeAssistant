const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  WorkName: {
    type: String,
    required: [true, 'A Work field must have a name'],
    unique: true,
    trim: true,
    maxlength: [100, 'A WorkName must have less or equal then 100 characters'],
    minlength: [10, 'A Workname must have more or equal then 10 characters'],
  },
  StartDate: {
    type: Date,
    required: [true, 'Starting date of the work is required'],
  },
  EndDate: {
    type: Date,
    required: [true, 'Expecting finish date of the work is required'],
  },
  Description: {
    type: String,
    required: [true, 'Your should enter some description of the project'],
    trim: true,
    maxlength: [
      100,
      'A Description must have less or equal then 100 characters',
    ],
    minlength: [10, 'A Description must have more or equal then 10 characters'],
  },
  TaskCreatedAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  AddModule: [
    {
      moduleName: {
        type: String,
        required: true,
      },
      StartDate: {
        type: Date,
        required: [true, 'Starting date of the module is required'],
      },
      EndDate: {
        type: Date,
        required: [true, 'Expecting finish date of the module is required'],
      },
    },
  ],
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
