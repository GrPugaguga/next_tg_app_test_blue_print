import React from 'react';

const MarketPlace: React.FC = () => {
  const items = [10, 13, 7, 5, 8];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-700 p-4">
      <div className="flex justify-around">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-1">
              <div className="text-yellow-300 text-xl font-bold">{item}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPlace;
