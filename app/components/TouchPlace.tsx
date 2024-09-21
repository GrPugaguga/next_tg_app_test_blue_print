"use client"
import React from 'react';
import { useUser } from '../context/userContext';

export default function TouchPlace() {
  const { handleClick } = useUser()

  return (
    <div 
    className="w-[400px] h-[400px] bg-blue-500 flex items-center justify-center cursor-pointer " 
    onPointerUp={handleClick}
    >
      <span className="text-white text-2xl font-bold">Нажми!</span>
    </div>
  );
};

