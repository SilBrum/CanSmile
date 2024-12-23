const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});


module.exports = mongoose.model('Appointment', AppointmentSchema);
