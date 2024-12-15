const Clinic = require('../models/Clinic');

// Get all clinics or filter by treatment
const getClinics = async (req, res) => {
  const { treatment, destination } = req.query;

  console.log('Query parameters:', { treatment, destination }); // Debug log

  try {
    // Build a dynamic query object
    const query = {};
    if (treatment) {
      query['services.name'] = { $regex: new RegExp(treatment, 'i') }; // Case-insensitive match
    }
    if (destination) {
      query.location = { $regex: new RegExp(destination, 'i') }; // Case-insensitive match
    }

    console.log('Generated query:', query); // Debug log

    // Fetch clinics based on the query and sort by rating in descending order
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

module.exports = {
  getClinics,
  getClinicById,
  addClinic,
};
