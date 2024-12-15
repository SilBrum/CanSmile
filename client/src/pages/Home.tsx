import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import ReviewCard from '../components/ReviewCard';

const Home: React.FC = () => {
  const reviews = [
    { name: 'John Doe', rating: 5, review: 'Amazing service and experience!' },
    { name: 'Jane Smith', rating: 4, review: 'Affordable and high-quality care.' },
  ];

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
              <SearchBar />
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
