import React, { useEffect, useState } from 'react';
import ClinicCard from '../components/ClinicCard';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Clinic {
  _id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  services: {
    name: string;
    price: number;
    duration: string;
  }[];
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams(); // Get query parameters
  const [clinics, setClinics] = useState<Clinic[]>([]);

  // Extract treatment and destination from query parameters
  const treatment = searchParams.get('treatment');
  const destination = searchParams.get('destination');


  useEffect(() => {
    const fetchClinics = async () => {
      if (treatment || destination) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/clinics`, {
          params: { treatment, destination },
        });
        console.log('Clinics fetched:', response.data);
        // Sort clinics by rating (highest to lowest)
        const sortedClinics = response.data.sort((a: Clinic, b: Clinic) => b.rating - a.rating);
        setClinics(sortedClinics);
      } catch (err) {
        console.error('Error fetching clinics:', err);
      }
    }
    };

    fetchClinics();
  }, [treatment, destination]);

  return (
    <>
    <Navbar />
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center text-red-600">
        Clinics Offering {decodeURIComponent(treatment ? decodeURIComponent(treatment): 'Unknown Treatment')}
      </h1>
      <div className="flex flex-wrap justify-center mt-8">
        {clinics.length > 0 ? (
          clinics.map((clinic) => (
            <ClinicCard
              key={clinic._id}
              id={clinic._id}
              name={clinic.name}
              location={clinic.location}
              imageUrl={clinic.imageUrl}
              rating={clinic.rating}
              reviews={clinic.reviews}
              services={clinic.services}
            />
          ))
        ) : (
          <p className="text-gray-500">No clinics found for this treatment.</p>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SearchResults;
