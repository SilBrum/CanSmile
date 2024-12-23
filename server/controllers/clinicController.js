const Clinic = require('../models/Clinic');
const Appointment = require('../models/Appointment');

// Get all clinics or filter by treatment
const getClinics = async (req, res) => {
  const { treatment, destination } = req.query;

  console.log('Query parameters:', { treatment, destination }); // Debug log

  try {
    const query = {};
    if (treatment) {
      query['services.name'] = { $regex: new RegExp(treatment, 'i') }; 
    }
    if (destination) {
      query.location = { $regex: new RegExp(destination, 'i') };
    }

    console.log('Generated query:', query);

    // Get clinics based on the query and sort by rating in descending order
    const clinics = await Clinic.find(query).sort({ rating: -1 });
    console.log('Clinics found:', clinics); // Debug log

    res.json(clinics);
  } catch (err) {
    console.error('Error fetching clinics:', err);
    res.status(500).json({ message: 'Failed to fetch clinics' });
  }
};

// Get clinic by ID
const getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }
    res.json(clinic);
  } catch (err) {
    console.error('Error fetching clinic by ID:', err);
    res.status(500).json({ message: 'Failed to fetch clinic' });
  }
};

// Add a new clinic (for dentists)
const addClinic = async (req, res) => {
  const { name, imageUrl, rating, reviews, services } = req.body;

  try {
    const clinic = new Clinic({
      name,
      imageUrl,
      rating,
      reviews,
      services,
    });
    await clinic.save();
    res.status(201).json({ message: 'Clinic added successfully', clinic });
  } catch (err) {
    console.error('Error adding clinic:', err);
    res.status(500).json({ message: 'Failed to add clinic' });
  }
};

// Get appointments for a clinic
const getClinicAppointments = async (req, res) => {
  try {
    const clinicId = req.user.id; // Assuming clinic accounts are authenticated
    const appointments = await Appointment.find({ clinicId }).populate('userId', 'name email');
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching clinic appointments:', err);
    res.status(500).json({ message: 'Failed to fetch clinic appointments' });
  }
};

// Manage an appointment
const manageAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body; // e.g., "approved", "rejected"

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: `Appointment ${status} successfully` });
  } catch (err) {
    console.error('Error managing appointment:', err);
    res.status(500).json({ message: 'Failed to manage appointment' });
  }
};

module.exports = {
  getClinics,
  getClinicById,
  addClinic,
  getClinicAppointments,
  manageAppointment,
};
