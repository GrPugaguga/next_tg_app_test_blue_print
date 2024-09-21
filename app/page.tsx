"use client"

import { useUser } from "./context/userContext";
import { useFetch } from "../hooks/useFetch";
import UserInfo from "./components/UserInfo";
import TouchPlace from './components/TouchPlace';
import InfoPlace from './components/InfoPlace'; // Added import for InfoPlace component
import MarketPlace from './components/MarketPlace';

export default function UserDataComponent() {
  const { userData, energy } = useUser(); 

  // const fetchData = useFetch();

  // const sendToken = async () => {
  //     const data = await fetchData('jwt', 'POST', {
  //       message: 'Hello from Telegram',
  //     });
  //     console.log(data);
  // }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen bg-gray-800 text-black">Загрузка ...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-black">
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <UserInfo />
          <InfoPlace gold={userData.points} energy={energy} maxEnergy={userData.max_energy}/> {/* Предполагаем, что у вас есть состояние для энергии */}
        </div>
      </div>
      <div className="flex-grow flex justify-center items-center mb-[100px]">
        <TouchPlace />
      </div>
      <MarketPlace />
    </div>
  );
}
