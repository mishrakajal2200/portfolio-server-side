
const express = require('express');
const router = express.Router();
const { registerUser,loginUser } = require('../controllers/userController');

// register user route
router.post('/signup', registerUser);

// login user route
router.post('/login',loginUser);


// Sample logout route for session management
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Replace with your session cookie name
    return res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;


