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
  {
    name: 'Sunshine Dental Care',
    location: 'Rio de Janeiro, Brazil',
    imageUrl: 'https://www.woodburydentalcare.com/files/2020/04/Dental-Office-2.jpg',
    services: [
      { name: 'Veneers', price: 800, duration: '3 hours' },
      { name: 'Teeth Whitening', price: 250, duration: '1.5 hours' },
    ],
    rating: 4.8,
    reviews: 200,
  },
  {
    name: 'Cosmetic Smiles',
    location: 'San Jose, Costa Rica',
    imageUrl: 'https://www.britannica.com/explore/savingearth/wp-content/uploads/sites/4/2019/02/Dentist-cleaning-office.png',
    services: [
      { name: 'Root Canal', price: 300, duration: '2 hours' },
      { name: 'Dental Crown', price: 500, duration: '3 hours' },
    ],
    rating: 4.7,
    reviews: 180,
  },
  {
    name: 'Pearl Dental Center',
    location: 'Bangkok, Thailand',
    imageUrl: 'https://images.unsplash.com/photo-1579370318449-5f2f6c9a8392?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    services: [
      { name: 'Dental Implant', price: 1100, duration: '2.5 hours' },
      { name: 'Orthodontics (Braces)', price: 1500, duration: 'Multiple visits' },
    ],
    rating: 4.6,
    reviews: 130,
  },
  {
    name: 'White Smile Dental',
    location: 'Toronto, Canada',
    imageUrl: 'https://images.unsplash.com/photo-1588776811926-57c80e306416?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    services: [
      { name: 'Teeth Cleaning', price: 100, duration: '30 minutes' },
      { name: 'Cavity Filling', price: 150, duration: '1 hour' },
    ],
    rating: 4.9,
    reviews: 210,
  },
  {
    name: 'Healthy Smile Dental',
    location: 'Punta Cana, Dominican Republic',
    imageUrl: 'https://images.unsplash.com/photo-1593311520938-47d1647b8dd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    services: [
      { name: 'Dental Implant', price: 1300, duration: '2 hours' },
      { name: 'Teeth Whitening', price: 250, duration: '1 hour' },
    ],
    rating: 4.4,
    reviews: 140,
  },
  {
    name: 'Bright Dental Clinic',
    location: 'Budapest, Hungary',
    imageUrl: 'https://images.unsplash.com/photo-1579986424098-9cebee31f27b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    services: [
      { name: 'Root Canal', price: 350, duration: '2 hours' },
      { name: 'Orthodontics (Braces)', price: 2000, duration: 'Multiple visits' },
    ],
    rating: 4.7,
    reviews: 160,
  },
  {
    name: 'Perfect Smile Clinic',
    location: 'Mumbai, India',
    imageUrl: 'https://images.unsplash.com/photo-1519864504468-7a568021eb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    services: [
      { name: 'Teeth Whitening', price: 180, duration: '1 hour' },
      { name: 'Veneers', price: 750, duration: '3 hours' },
    ],
    rating: 4.8,
    reviews: 190,
  },
  {
    name: 'Global Dental Solutions',
    location: 'Istanbul, Turkey',
    imageUrl: 'https://images.unsplash.com/photo-1597275199352-9eced52f2a55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    services: [
      { name: 'Dental Implant', price: 1000, duration: '2 hours' },
      { name: 'Dental Crown', price: 450, duration: '2 hours' },
    ],
    rating: 4.5,
    reviews: 170,
  },
  {
    name: 'Sunny Dental Center',
    location: 'Havana, Cuba',
    imageUrl: 'https://images.unsplash.com/photo-1588334437291-5b6a1cc15454?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    services: [
      { name: 'Teeth Cleaning', price: 100, duration: '30 minutes' },
      { name: 'Cavity Filling', price: 120, duration: '1 hour' },
    ],
    rating: 4.6,
    reviews: 100,
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
