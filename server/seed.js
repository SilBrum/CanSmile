const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Clinic = require('./models/Clinic');

dotenv.config();

const clinics = [
  {
    name: 'Smile Bright Dental',
    location: 'Cancun, Mexico',
    imageUrl: 'https://www.keshavarzdentistry.com/wp-content/uploads/2023/10/Dental-Office-and-Dental-Clinic-Differences-in-Brampton-768x403.jpg',
    services: [
      { name: 'Dental Implant', price: 1200, duration: '2 hours' },
      { name: 'Teeth Whitening', price: 200, duration: '1 hour' },
    ],
    rating: 4.5,
    reviews: 150,
  },

];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    return Clinic.deleteMany({});
  })
  .then(() => {
    return Clinic.insertMany(clinics);
  })
  .then(() => {
    console.log('Database seeded');
    mongoose.connection.close();
  })
  .catch((err) => console.error('Database seeding error:', err));
