const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Task description is required'],
      trim: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task must be assigned to an Employee'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    status: {
      type: String,
      enum: ['New Task', 'Accepted', 'Completed', 'Failed'],
      default: 'New Task',
    },
    taskDate: {
      type: String,
      required: [true, 'Task date is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
