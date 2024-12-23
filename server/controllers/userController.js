const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/Appointment');

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update User Profile
exports.updateUserProfile = async (req, res) => {
  const { name, email, profilePicture } = req.body;
  const userId = req.user.id; // Extracted from auth middleware

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Book Appointment
exports.bookAppointment = async (req, res) => {
  const { clinicId, appointmentDate, appointmentTime } = req.body;
  const userId = req.user.id;

  try {
    if (!clinicId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const appointment = new Appointment({
      user: userId,
      clinic: clinicId,
      date: appointmentDate,
      time: appointmentTime,
    });

    await appointment.save();

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Appointments
exports.getUserAppointments = async (req, res) => {
  const userId = req.user.id;

  try {
    const appointments = await Appointment.find({ user: userId }).populate('clinic', 'name location');

    res.json({
      message: 'Appointments retrieved successfully',
      appointments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

//Delete or cancel appointments
exports.cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: 'Appointment canceled successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to cancel appointment.' });
  }
};


// Add Clinic to Favorites
exports.addFavorite = async (req, res) => {
  const userId = req.user.id;
  const { clinicId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.favorites.includes(clinicId)) {
      return res.status(400).json({ message: 'Clinic already in favorites' });
    }

    user.favorites.push(clinicId);
    await user.save();

    res.status(200).json({ message: 'Clinic added to favorites', favorites: user.favorites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add to favorites' });
  }
};

// Get User Favorites
exports.getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('favorites', 'name location rating');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
};

