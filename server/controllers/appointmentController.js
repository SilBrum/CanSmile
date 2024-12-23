const Appointment = require('../models/Appointment');
const Clinic = require('../models/Clinic');
const User = require('../models/User');

exports.bookAppointment = async (req, res) => {
  const { clinicId, appointment } = req.body;
  const userId = req.user.id;

  console.log('Booking request received:', { clinicId, appointment, userId });

  try {
    // Ensure the clinic exists
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create and save the appointment
    const newAppointment = new Appointment({
      user: userId, // Reference to the user
      clinic: clinicId, // Reference to the clinic
      date: appointment.date,
      time: appointment.time,
    });

    console.log('Creating appointment with data:', newAppointment);

    await newAppointment.save();

    console.log('Appointment booked successfully:', newAppointment);

    res.status(200).json({
      message: 'Appointment booked successfully',
      appointment: newAppointment,
    });
  } catch (err) {
    console.error('Error booking appointment:', err);
    res.status(500).json({ message: 'Failed to book appointment' });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch appointments for the user and populate clinic details
    const appointments = await Appointment.find({ user: userId }).populate(
      'clinic',
      'name location'
    );

    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching user appointments:', err);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};
