import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import axios from 'axios';

// Define TypeScript interfaces for appointments and favorites
interface Appointment {
  _id: string; // Add ID for deletion
  date: string;
  time: string;
  clinic: {
    name: string;
  };
}

interface Favorite {
  name: string;
  location: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    profilePicture: '',
  });
  const [appointments, setAppointments] = useState<Appointment[]>([]); // Typed array of appointments
  const [favorites, setFavorites] = useState<Favorite[]>([]); // Typed array of favorites
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  // Authentication check
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login page if not authenticated
    } else {
      fetchUserData();
      fetchAppointments();
      fetchFavorites();
    }
  }, [isAuthenticated, navigate]);

  // Fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  // Fetch appointments data
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/users/appointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAppointments(response.data.appointments);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  // Fetch favorites data
  const fetchFavorites = async () => {
    try {
      const response = await axios.get('/api/users/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavorites(response.data.favorites);
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await axios.delete(`/api/users/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Appointment canceled successfully.');
      setAppointments(appointments.filter((appt) => appt._id !== appointmentId));
    } catch (err) {
      console.error('Error canceling appointment:', err);
      alert('Failed to cancel appointment.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      const previewURL = URL.createObjectURL(e.target.files[0]);
      setUser({ ...user, profilePicture: previewURL });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('phone', user.phone);
      if (selectedFile) {
        formData.append('profilePicture', selectedFile);
      }

      await axios.post('/api/users/profile/update', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile updated successfully.');
      fetchUserData();
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            {/* Profile Picture and Name */}
            <div className="mb-6">
              <label className="block w-40 h-40 mx-auto rounded-full shadow-lg bg-gray-200 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <img
                  src={user.profilePicture || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover"
                />
              </label>
              <h1 className="text-3xl font-bold mt-4">{user.name || 'Loading...'}</h1>
            </div>

            {/* Profile Edit Form */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
                className="block w-full border rounded-md p-2 mb-4"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="block w-full border rounded-md p-2 mb-4"
              />
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="block w-full border rounded-md p-2 mb-4"
              />
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>

            {/* Appointments Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
              {appointments.length > 0 ? (
                <ul>
                  {appointments.map((appointment) => (
                    <li
                      key={appointment._id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div>
                        {appointment.date} at {appointment.time} - Clinic:{' '}
                        {appointment.clinic.name}
                      </div>
                      <button
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No appointments yet.</p>
              )}
            </div>

            {/* Favorites Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-semibold mb-4">Favorite Clinics</h2>
              {favorites.length > 0 ? (
                <ul>
                  {favorites.map((favorite, index) => (
                    <li key={index} className="border-b py-2">
                      {favorite.name} - {favorite.location}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No favorite clinics yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
