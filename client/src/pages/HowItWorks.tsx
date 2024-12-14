import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HowItWorks: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="how-it-works bg-blue-50 py-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-blue-600 text-center">How It Works</h1>
          <div className="mt-8 flex flex-wrap justify-around">
            <div className="w-1/3 p-4">
              <h2 className="text-2xl font-bold text-blue-500">1. Search for Clinics</h2>
              <p className="text-gray-700 mt-2">
                Explore affordable clinics abroad by location, treatment type, or price range.
              </p>
            </div>
            <div className="w-1/3 p-4">
              <h2 className="text-2xl font-bold text-blue-500">2. Compare Prices</h2>
              <p className="text-gray-700 mt-2">
                Use our cost comparison tool to see how much you can save.
              </p>
            </div>
            <div className="w-1/3 p-4">
              <h2 className="text-2xl font-bold text-blue-500">3. Book Your Appointment</h2>
              <p className="text-gray-700 mt-2">
                Choose your preferred clinic and book your dental appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HowItWorks;
