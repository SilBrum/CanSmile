import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-600 font-bold text-lg w-full text-left"
      >
        {question}
      </button>
      {isOpen && <p className="text-gray-700 mt-2">{answer}</p>}
    </div>
  );
};

export default FAQItem;
