"use client"
import { useState } from 'react';
import { useUser } from "../context/userContext";
import Image from "next/image";
import {useFetch} from "../../hooks/useFetch";
import { initUtils } from '@telegram-apps/sdk'


export default function UserInfo() {
  const { userData,setUserData } = useUser();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const fetchData = useFetch();
  const INVITE_URL = "https://t.me/spartatestapp_bot/app"


  const handleInviteFriend = () => {
    const utils = initUtils()
    const inviteLink = `${INVITE_URL}?startapp=${userData.referal_link}`
    const shareText = `Join me on this awesome Telegram mini app!`
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`
    utils.openTelegramLink(fullUrl)
  }

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${userData.id}`
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard!')
  }


  const useBoost = async (id:string) => {
    const data = await fetchData('useBoost', 'POST', {
      booster: id
    });
    if(data.user){
      setUserData((prev: any) => ({...prev, 
        boosters: data.user.boosters,
        energy: data.user.energy,
        points_per_click: data.user.points_per_click,
        booster_expirated_time: data.user.booster_expirated_time,
        }))
    }
  }   

  const checkIn = async () => {
    const data = await fetchData('daily', 'GET');
    if(data){
      console.log(data)
      setUserData((prev: any) => ({...prev, 
        daily_streak: {
          count: data.streak,
          last_claim_time: data.last_claim_time
        },
        points: prev.points + data.revard,
      }))
    }
  }

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
          <h2 className="text-xl font-bold mb-2">Boosters</h2>
          <ul className="space-y-2">
            {Object.entries(userData.boosters).map(([id, booster], index) => (
              <li key={index}>
                <div className="flex flex-col items-center">
                  <span>{id}</span>
                  <div
                    className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-1"
                    onClick={() => useBoost(id)}
                  >
                    <div className="text-yellow-300 text-xl font-bold">
                      {booster?.count}
                    </div>
                  </div>
                </div>
              </li>
            ))}
             <li >
                <div className="flex flex-col items-center">
                  <span>DailyStreak</span>
                  <div
                    className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-1"
                    onClick={() => checkIn()}
                  >
                    <div className="text-yellow-300 text-xl font-bold">
                      {userData.daily_streak.count}
                    </div>
                  </div>
                </div>
              </li>
              <li>
              <div className="flex flex-col space-y-4">
        <button
          onClick={handleInviteFriend}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Invite Friend
        </button>
        <button
          onClick={handleCopyLink}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy Invite Link
        </button>
        </div>
              </li>
          </ul>
        </div>
      )}
    </div>
  );
}
