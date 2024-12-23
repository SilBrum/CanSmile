import React, { useState } from 'react';

interface PriceComparisonProps {
  treatment: { name: string; price: number };
  flightPrice: number;
}

const PriceComparison: React.FC<PriceComparisonProps> = ({ treatment, flightPrice }) => {
  const [includeFlight, setIncludeFlight] = useState(false);

  // Average Canadian Prices for Treatments
  const canadianPrices: { [key: string]: { min: number; max: number } } = {
    'Dental Implant': { min: 4165, max: 5222 },
    'Teeth Whitening': { min: 310, max: 550 },
    'Veneers': { min: 1140, max: 1440 },
    'Root Canal': { min: 500, max: 800 },
    'Dental Crown': { min: 1140, max: 1640 },
    'Orthodontics (Braces)': { min: 4000, max: 10000 },
    'Teeth Cleaning': { min: 257, max: 321 },
    'Cavity Filling': { min: 200, max: 460 },
  };

  const canadianPriceRange = canadianPrices[treatment.name] || { min: 0, max: 0 };

  // Total Cost Calculation
  const totalCost = parseFloat(treatment.price.toString()) + (includeFlight ? parseFloat(flightPrice.toString()) : 0);

  // Savings Calculation
  const potentialSavingsMin = canadianPriceRange.min - totalCost;
  const potentialSavingsMax = canadianPriceRange.max - totalCost;

  return (
    <div className="bg-gray-100 p-6 rounded shadow-md mt-8">
      <h3 className="text-2xl font-bold text-blue-900">Price Comparison</h3>
      <p className="text-lg mt-4">
        <strong>Selected Treatment:</strong> {treatment.name}
      </p>
      <p>
        <strong>Clinic Price:</strong> ${treatment.price.toLocaleString()} CAD
      </p>

      {/* Include Flight Option */}
      <div className="mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeFlight}
            onChange={() => setIncludeFlight(!includeFlight)}
            className="mr-2"
          />
          Include Flight Price (${flightPrice.toLocaleString()} CAD)
        </label>
      </div>

      <p className="mt-2">
        <strong>Total Cost:</strong> ${totalCost.toLocaleString()} CAD
      </p>

      <hr className="my-4" />

      <p>
        <strong>Average Canadian Price:</strong> ${canadianPriceRange.min.toLocaleString()} to $
        {canadianPriceRange.max.toLocaleString()} CAD
      </p>
      <p className="text-green-600 font-bold mt-2">
        <strong>Potential Savings:</strong>{' '}
        {potentialSavingsMin > 0 || potentialSavingsMax > 0
          ? `$${potentialSavingsMin.toLocaleString()} to $${potentialSavingsMax.toLocaleString()} CAD`
          : 'No savings compared to Canadian prices'}
      </p>
    </div>
  );
};

export default PriceComparison;
