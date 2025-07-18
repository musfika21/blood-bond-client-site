import React from 'react';

const InfoCards = () => {
  const cards = [
    {
      id: 1,
      title: 'Find A Clinic',
      subtitle: 'Upcoming clinics',
      icon: '📍',
    },
    {
      id: 2,
      title: 'Am I Eligible?',
      subtitle: 'Quick eligibility quiz',
      icon: '💧',
    },
    {
      id: 3,
      title: 'How it Works',
      subtitle: 'What to expect',
      icon: '✅',
    },
    {
      id: 4,
      title: 'About Blood',
      subtitle: "How it's used",
      icon: '❤️',
    },
  ];

  return (
    <div className="w-full bg-[#e53935] py-12 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl px-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg flex flex-col items-center p-6 relative overflow-visible text-center"
          >
            {/* Circle Icon */}
            <div className="absolute -top-10 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg border-4 border-[#e53935]">
              <span className="text-3xl">{card.icon}</span>
              
            </div>

            {/* Card Content */}
            <div className="mt-12">
              <h3 className="text-[#e53935] text-lg font-bold underline">{card.title}</h3>
              <p className="text-gray-700 mt-2">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCards;
