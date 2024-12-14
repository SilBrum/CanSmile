const express = require('express');
const router = express.Router();
const { getFlights, getHotels } = require('../controllers/travelController');

router.get('/flights', getFlights);
router.get('/hotels', getHotels);

module.exports = router;
