const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Task = require('../models/task');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (admin/employee)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    user = new User({ name, email, password, role });
    await user.save();
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    let userData = { id: user._id, name: user.name, email: user.email, role: user.role };

    // If it's an employee, also send tasks and counts like the frontend expects
    if (user.role === 'Employee') {
      const tasks = await Task.find({ assignedTo: user._id });
      const taskCounts = {
        newTask: tasks.filter(t => t.status === 'New Task').length,
        active: tasks.filter(t => t.status === 'Accepted').length,
        completed: tasks.filter(t => t.status === 'Completed').length,
        failed: tasks.filter(t => t.status === 'Failed').length,
      };
      userData = { ...userData, tasks, taskCounts };
    }

    res.status(200).json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
