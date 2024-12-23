const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  bookAppointment, 
  getUserAppointments,
  cancelAppointment 
} = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { addFavorite, getFavorites } = require('../controllers/userController');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Route for users to book an appointment
router.post('/appointments/book', auth, bookAppointment);

// Route for users to get their appointments in the profile page
router.get('/appointments', auth, getUserAppointments);

router.delete('/appointments/:id', auth, cancelAppointment);


router.post('/favorites', auth, addFavorite);

router.get('/favorites', auth, getFavorites);


// Fetch user profile
router.get('/profile', auth, getUserProfile);

// Update user profile
router.post('/profile/update', auth, updateUserProfile);



module.exports = router;
