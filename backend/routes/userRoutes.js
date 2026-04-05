const express = require('express');
const User = require('../models/user');
const Task = require('../models/task');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (employees) with their tasks
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: 'Employee' }).select('-password').lean();
    
    // For each user, find their tasks
    const usersWithTasks = await Promise.all(users.map(async (user) => {
      const tasks = await Task.find({ assignedTo: user._id });
      
      // Calculate counts like the frontend expects
      const taskCounts = {
        newTask: tasks.filter(t => t.status === 'New Task').length,
        active: tasks.filter(t => t.status === 'Accepted').length,
        completed: tasks.filter(t => t.status === 'Completed').length,
        failed: tasks.filter(t => t.status === 'Failed').length,
      };

      return { ...user, tasks, taskCounts };
    }));

    res.json(usersWithTasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user details
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      
      res.json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
