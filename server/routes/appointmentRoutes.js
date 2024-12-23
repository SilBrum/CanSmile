const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../middlewares/auth'); // Import the auth middleware
const { bookAppointment, getUserAppointments } = require('../controllers/appointmentController');

// Route to send an appointment request email
router.post('/send-email', async (req, res) => {
  const { clinicEmail, user, appointment } = req.body;

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: clinicEmail,
    subject: 'Appointment Request',
    text: `User ${user.name} requested an appointment on ${appointment.date} at ${appointment.time}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Appointment request sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Failed to send appointment request' });
  }
});

// Book an appointment (User)
router.post('/book', auth, bookAppointment);

// Get user-specific appointments
router.get('/user', auth, getUserAppointments);

module.exports = router;
