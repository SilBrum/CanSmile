const express = require('express');
const router = express.Router();
const { getClinics, getClinicById, addClinic } = require('../controllers/clinicController');
const auth = require('../middlewares/auth');

// Get all clinics
router.get('/', getClinics);

// Get clinic by ID
router.get('/:id', getClinicById);

// For dentists
router.post('/', auth, addClinic);

module.exports = router;
