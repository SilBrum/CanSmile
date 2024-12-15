const express = require('express');
const router = express.Router();
const { getClinics, getClinicById, addClinic } = require('../controllers/clinicController');
const auth = require('../middlewares/auth');

// Get all clinics (supports filtering by treatment)
router.get('/', getClinics);

// Get clinic by ID
router.get('/:id', getClinicById);

// Add a new clinic (for dentists)
router.post('/', auth, addClinic);

// Add a route for `/search/listing` to handle filtered queries
router.get('/search/listing', getClinics);

module.exports = router;
