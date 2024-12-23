import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import FlightSearch from '../components/FlightSearch';
import PriceComparison from '../components/PriceComparison';
import Footer from '../components/Footer';

interface Clinic {
  name: string;
  location: string;
  imageUrl: string;
  services: {
    name: string;
    price: number;
    duration: string;
  }[];
  rating: number;
  reviews: number;
  email: string;
}

const ClinicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [selectedFlightPrice, setSelectedFlightPrice] = useState<number | null>(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  // Check for authentication
  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const response = await axios.get(`/api/clinics/${id}`);
        setClinic(response.data);
      } catch (err) {
        console.error('Error fetching clinic details:', err);
      }
    };
    fetchClinic();
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem('token'); // Check if token exists
    if (!token) {
      alert('You need to be logged in to book an appointment.');
      navigate('/login'); // Redirect to login
      return;
    }
  
    if (!appointmentDate || !appointmentTime) {
      alert('Please select a date and time for your appointment.');
      return;
    }
  
    setIsBooking(true);
  
    try {
      const bookingData = {
        clinicId: id,
        appointment: { date: appointmentDate, time: appointmentTime },
      };
  
      await axios.post('/api/appointments/book', bookingData, {
        headers: { 'x-auth-token': token },
      });
  
      alert('Appointment request sent successfully.');
    } catch (err) {
      console.error('Error booking appointment:', err);
      alert('Failed to send appointment request.');
    } finally {
      setIsBooking(false);
    }
  };

  const handleFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to favorite a clinic.');
      navigate('/login'); // Redirect to login
      return;
    }
  
    try {
      await axios.post(
        '/api/users/favorites',
        { clinicId: id },
        { headers: { 'x-auth-token': token } }
      );
      alert('Clinic favorited successfully.');
    } catch (err) {
      console.error('Error favoriting clinic:', err);
      alert('Failed to favorite clinic.');
    }
    
  };
  
  if (!clinic) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold text-red-700">{clinic.name}</h2>
        <div className="flex mt-4">
          <img src={clinic.imageUrl} alt={clinic.name} className="w-1/2 rounded" />
          <div className="ml-8 w-1/2">
            <p className="text-xl font-bold text-blue-900">{clinic.location}</p>
            <div className="flex items-center my-2">
              <span className="text-yellow-500">{'⭐'.repeat(Math.round(clinic.rating))}</span>
              <span className="ml-2 text-gray-600">({clinic.reviews} reviews)</span>
              <button
                onClick={handleFavorite}
                className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600">
                Favorite
                </button>
            </div>
            <h3 className="text-2xl font-bold mt-4">Services</h3>
            <table className="w-full mt-2">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-red-900 text-white">Service</th>
                  <th className="border px-4 py-2 bg-red-900 text-white">Price</th>
                  <th className="border px-4 py-2 bg-red-900 text-white">Duration</th>
                </tr>
              </thead>
              <tbody>
                {clinic.services.map((service, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{service.name}</td>
                    <td className="border px-4 py-2">${service.price}</td>
                    <td className="border px-4 py-2">{service.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-5">Search Flights</h3>
          <FlightSearch
            destination={clinic.location}
            onFlightSelect={(price: number) => setSelectedFlightPrice(price)}
          />
        </div>

        <div className="mt-8">
          <PriceComparison
            treatment={{ name: 'Dental Implant', price: clinic.services[0].price }}
            flightPrice={selectedFlightPrice || 0}
          />
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-blue-600">Book an Appointment</h3>
          <label htmlFor="appointmentDate" className="block font-bold mt-4">
            Select Date:
          </label>
          <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="border px-2 py-1"
          />

          <label htmlFor="appointmentTime" className="block font-bold mt-4">
            Select Time:
          </label>
          <select
            id="appointmentTime"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="" disabled>Select Time</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="13:00">01:00 PM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
          </select>

          <button
            onClick={handleBooking}
            disabled={isBooking}
            className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded ${
              isBooking ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {isBooking ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClinicDetails;
