const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks (can filter by assignedTo query param)
router.get('/', async (req, res) => {
  try {
    const { assignedTo } = req.query;
    const filter = assignedTo ? { assignedTo } : {};

    const tasks = await Task.find(filter).populate('assignedTo', 'name email');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, taskDate, category, assignedTo } = req.body;
    const newTask = new Task({ title, description, taskDate, category, assignedTo });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   PUT /api/tasks/:id/status
// @desc    Update task status (New, Active, Completed, Failed)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
