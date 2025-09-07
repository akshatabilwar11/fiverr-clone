const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.role}! You are authenticated.`,
    user: req.user,
  });
});

module.exports = router;
