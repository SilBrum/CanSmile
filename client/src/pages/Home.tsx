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
      <div
  className="relative bg-cover bg-center py-24 lg:py-56"
  style={{
    backgroundImage: "url('https://img.freepik.com/free-photo/close-up-young-friends-having-fun-beach_329181-16417.jpg?t=st=1734826373~exp=1734829973~hmac=f4f39c590870db000f99bf356ec75f8d3e774e91435e651a5122e3c89c688694&w=2000')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to to-red-900 opacity-70"></div>

  {/* Content */}
  <div className="relative z-10 px-4 mx-auto max-w-screen-xl text-center">
    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
      Smile Big, Save Big!
    </h1>
    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
      Discover affordable dental care abroad and plan the perfect getaway for your smile.
    </p>
    <div className="flex justify-center">
      <SearchBar />
    </div>
  </div>
</div>


      {/* Reviews Section */}
      <div className="reviews bg-white py-10">
        <h2 className="text-3xl font-bold text-center text-blue-900">What Our Clients Say</h2>
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
