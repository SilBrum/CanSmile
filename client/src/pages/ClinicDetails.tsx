import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

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
}

const ClinicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clinic, setClinic] = useState<Clinic | null>(null);

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

  if (!clinic) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold text-blue-600">{clinic.name}</h2>
        <div className="flex mt-4">
          <img src={clinic.imageUrl} alt={clinic.name} className="w-1/2 rounded" />
          <div className="ml-8 w-1/2">
            <p className="text-xl">Location: {clinic.location}</p>
            <div className="flex items-center my-2">
              <span className="text-yellow-500">{'⭐'.repeat(Math.round(clinic.rating))}</span>
              <span className="ml-2 text-gray-600">({clinic.reviews} reviews)</span>
            </div>
            <h3 className="text-2xl font-bold mt-4">Services</h3>
            <table className="w-full mt-2">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Service</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Duration</th>
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
            <button
              className="bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600"
              // onClick={handleBooking}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicDetails;
