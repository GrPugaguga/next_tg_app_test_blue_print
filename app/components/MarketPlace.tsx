'use client'
import React from 'react';
import { useUser } from '../context/userContext';
import { useFetch } from "../../hooks/useFetch";
import getAvailableUpgrades from '@/hooks/getAvailableUpgrades';

  const MarketPlace = () => {
      const { upgrades,userData,setUpgrades,setUserData } = useUser()
        const fetchData = useFetch();

    const buyUpgrade = async (upgrade: any) => {
      const data = await fetchData('buyUp', 'POST', {
        user: userData,
        upgrade: upgrade
      });
      setUpgrades(getAvailableUpgrades(data.user,data.upgrades))
      setUserData((prev: any) => ({...data.user, points: prev.points - upgrade.level.price}))
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-700 p-4">
      <div className="flex justify-around">
        {upgrades?.map((item: any, index: any) => (
          <div key={index} className="flex flex-col items-center" onClick={()=>buyUpgrade(item)}>
            <span>{item?.id}</span>
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-1">
              <div className="text-yellow-300 text-xl font-bold">{item?.level?.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPlace;
