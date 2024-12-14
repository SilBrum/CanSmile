import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQItem from '../components/FAQItem';

const FAQ: React.FC = () => {
  const faqData = [
    {
      question: 'What is dental tourism?',
      answer:
        'Dental tourism is the process of traveling to another country to receive affordable dental care.',
    },
    {
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment directly through our platform.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="faq bg-blue-50 py-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-blue-600 text-center">Frequently Asked Questions</h1>
          <div className="mt-8">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
