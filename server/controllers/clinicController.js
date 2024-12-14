const Clinic = require('../models/Clinic');

// Get all clinics
exports.getClinics = async (req, res) => {
  const { treatment, location } = req.query;
  let filter = {};

  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }

  if (treatment) {
    filter['services.name'] = { $regex: treatment, $options: 'i' };
  }

  try {
    const clinics = await Clinic.find(filter);
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get clinic by ID
exports.getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new clinic
exports.addClinic = async (req, res) => {
  if (req.user.role !== 'dentist') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { name, location, imageUrl, services } = req.body;
  try {
    const clinic = new Clinic({ name, location, imageUrl, services });
    await clinic.save();
    res.status(201).json({ message: 'Clinic added successfully', clinic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
