"use client"
import { useState } from 'react';
import { useUser } from "../context/userContext";
import Image from "next/image";

export default function UserInfo() {
  const { userData } = useUser();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  if (!userData) {
    return null;
  }

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="relative">
      <Image 
        src={userData.avatar} 
        alt="User Avatar" 
        width={50} 
        height={50} 
        className="rounded-full cursor-pointer" 
        onClick={togglePopup}
      />
      {isPopupVisible && (
        <div className="absolute top-full left-0 mt-2 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-10">
          <h2 className="text-xl font-bold mb-2">Данные пользователя</h2>
          <ul className="space-y-2">
            <li><span className="font-semibold">ID:</span> {userData.id}</li>
            <li><span className="font-semibold">Имя:</span> {userData.username}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
