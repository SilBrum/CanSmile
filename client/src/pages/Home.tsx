import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ClinicCard from '../components/ClinicCard';
import Footer from '../components/Footer';
import ReviewCard from '../components/ReviewCard';
import axios from 'axios';

interface Clinic {
  _id: string;
  name: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  services: {
    name: string;
    price: number;
    duration: string;
  }[];
}

const Home: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const reviews = [
    { name: 'John Doe', rating: 5, review: 'Amazing service and experience!' },
    { name: 'Jane Smith', rating: 4, review: 'Affordable and high-quality care.' },
  ];

  const handleSearch = async (searchType: string, query: string) => {
    try {
      const response = await axios.get(`/api/clinics`, {
        params: { [searchType.toLowerCase()]: query }, 
        headers: {
          "Access-Control-Allow-Origin": "*",
          "cache-control": "no-cache",
          "Content-Type": "application/json",
        },
      });
      setClinics(response.data);
    } catch (err) {
      console.error('Error fetching clinics:', err);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="hero bg-blue-100 py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-600">Smile Big, Save Big!</h1>
            <p className="text-lg mt-4">
              Discover affordable dental care abroad and plan the perfect getaway for your smile.
            </p>
            <div className="mt-6">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <img
              src="https://img.freepik.com/free-photo/beautiful-closeup-portrait-young-couple-posing-front-stunning-seascape_181624-28831.jpg"
              alt="Couple Smiling"
              className="rounded shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Clinics Section */}
      <div className="clinics bg-gray-100 py-10">
        <h2 className="text-3xl font-bold text-center text-blue-600">Our Clinics</h2>
        <div className="container mx-auto flex flex-wrap justify-center mt-8">
          {clinics.length > 0 ? (
            clinics.map((clinic) => (
              <ClinicCard
                key={clinic._id}
                id={clinic._id}
                name={clinic.name}
                imageUrl={clinic.imageUrl}
                rating={clinic.rating}
                reviews={clinic.reviews}
                services={clinic.services}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">Search for clinics to see results.</p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews bg-white py-10">
        <h2 className="text-3xl font-bold text-center text-blue-600">What Our Clients Say</h2>
        <div className="container mx-auto flex flex-wrap justify-center mt-8">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.name}
              rating={review.rating}
              review={review.review}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
