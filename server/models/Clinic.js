const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
});

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  services: { type: [serviceSchema], required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
});

module.exports = mongoose.model('Clinic', clinicSchema);