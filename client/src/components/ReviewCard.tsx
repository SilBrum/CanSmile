import React from 'react';

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, review }) => {
  return (
    <div className="bg-white shadow-lg rounded p-4 m-4 w-80">
      <div className="flex items-center mb-2">
        <span className="text-yellow-500">{'⭐'.repeat(rating)}</span>
        <span className="ml-2 text-gray-600">({rating}/5)</span>
      </div>
      <h3 className="text-lg font-bold text-blue-600">{name}</h3>
      <p className="text-gray-700 mt-2">{review}</p>
    </div>
  );
};

export default ReviewCard;
