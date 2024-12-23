const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Clinic = require('./models/Clinic');

dotenv.config();

const clinics = [
  {
    name: 'Smile Bright Dental',
    location: 'Cancun, Mexico',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1675686363399-91ad6111f82d?q=80&w=2957&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    imageUrl: 'https://zenithdental.in/wp-content/uploads/2023/04/dr-angad-khurana-dentist-in-noida.webp',
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
    imageUrl: 'https://elitefitout.com.au/wp-content/uploads/2020/06/Elite_Fitouts_GC_Dental_Solutions-30-1.jpg',
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
    imageUrl: 'https://xo-care.com/wp-content/uploads/2023/03/Dental-clinic-layout-header-1024x613.jpg',
    services: [
      { name: 'Dental Implant', price: 1100, duration: '2.5 hours' },
      { name: 'Orthodontics (Braces)', price: 1500, duration: 'Multiple visits' },
    ],
    rating: 4.6,
    reviews: 130,
  },
  {
    name: 'White Smile Dental',
    location: 'Rio de Janeiro, Brazil',
    imageUrl: 'https://www.dentalelements.ca/wp-content/uploads/2020/07/five-characteristics-of-the-best-dental-clinics.jpg',
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
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    imageUrl: 'https://images.unsplash.com/photo-1629909614456-6b1c5c94cecc?q=80&w=2988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    imageUrl: 'https://images.unsplash.com/photo-1643660526741-094639fbe53a?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    imageUrl: 'https://images.unsplash.com/photo-1643660527098-559f89e45a92?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
