import React from 'react';

interface InfoPlaceProps {
  gold: number;
  energy: number;
  maxEnergy: number;
}

const InfoPlace: React.FC<InfoPlaceProps> = ({ gold, energy, maxEnergy }) => {
  return (
    <div className="flex items-center space-x-4 bg-gray-700 rounded-lg p-2 w-full">
      <div className="text-white whitespace-nowrap">Gold: {gold}</div>
      <div className="flex-grow bg-gray-600 h-6 rounded-full overflow-hidden relative">
        <div 
          className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
          style={{ width: `${energy}%` }}
        ></div>
      </div>
      <div className="text-white whitespace-nowrap">{energy}/{maxEnergy}</div>
    </div>
  );
};

export default InfoPlace;
