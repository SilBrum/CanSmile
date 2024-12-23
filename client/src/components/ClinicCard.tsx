import React from 'react';
import { Link } from 'react-router-dom';

interface Service {
  name: string;
  price: number;
  duration: string;
}

interface ClinicCardProps {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  services: Service[];
}

const ClinicCard: React.FC<ClinicCardProps> = ({
  id,
  name,
  location,
  imageUrl,
  rating,
  reviews,
  services,
}) => {
  return (
    <div className="flex border p-4 mb-4 shadow-lg rounded">
      <img src={imageUrl} alt={name} className="w-1/3 rounded" />
      <div className="ml-4 w-2/3">
        <h2 className="text-xl font-bold text-blue-600">{name}</h2>
        <h3 className="text-base font-semibold text-red-600">{location}</h3>
        <div className="flex items-center my-2">
          <span className="text-yellow-500">{'⭐'.repeat(Math.round(rating))}</span>
          <span className="ml-2 text-gray-600">({reviews} reviews)</span>
        </div>
        <ul className="list-disc list-inside text-gray-700">
          {services.slice(0, 3).map((service, index) => (
            <li key={index}>{service.name}</li>
          ))}
        </ul>
        <Link
          to={`/clinic/${id}`}
          className="text-blue-500 mt-4 inline-block hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ClinicCard;
