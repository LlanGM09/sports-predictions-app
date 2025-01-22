const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error registering user' });
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, secure: true });
      res.json({ message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ error: 'Error logging in' });
    }
  }
);

module.exports = router;
