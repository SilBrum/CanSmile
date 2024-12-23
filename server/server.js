const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import all routes
const userRoutes = require('./routes/userRoutes');
const clinicRoutes = require('./routes/clinicRoutes');
const flightRoutes = require('./routes/flightRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import appointment routes

dotenv.config();

const app = express();

app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Verify Environment Variables
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/appointments', appointmentRoutes); // Use appointment routes

// Server Listener
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
