const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'dentist'], default: 'user' },
  date: { type: Date, default: Date.now },
  profilePicture: {type: String},
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }],
});



module.exports = mongoose.model('User', userSchema);
