const express = require('express');
const User = require('../models/userModel');
const auth = require('../middleware/auth');

const router = express.Router();

// Protected route
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

module.exports = router;
