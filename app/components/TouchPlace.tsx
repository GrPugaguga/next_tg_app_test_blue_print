"use client"
import React from 'react';
import { useUser } from '../context/userContext';

export default function TouchPlace() {
  const { handleClick, userData } = useUser() // добавлено userData

  return (
    <div 
    className={`w-[400px] h-[400px] ${userData.booster_expirated_time && userData.booster_expirated_time > Date.now()  ? 'bg-yellow-500' : 'bg-blue-500'} flex items-center justify-center cursor-pointer`} // изменен класс фона
    onPointerUp={handleClick}
    >
      <span className="text-white text-2xl font-bold">Нажми!</span>
    </div>
  );
};

