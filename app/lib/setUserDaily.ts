import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from './firebaseConfig';
import getUserData from "./getUserData";
import getDailyReward from "./getDailyReward";

export default async function setUserDaily(id: string | number ) {
  const userRef = doc(db, "users", String(id));
  const user = await getUserData(String(id))
  const today = new Date().toISOString().split("T")[0];
  if(!user) return false;
  const lastClaimTime = user?.daily_streak?.last_claim_time;
  console.log(lastClaimTime)
  // Преобразование строковой даты в объект Date для корректного сравнения
  const lastClaimDate = lastClaimTime ? new Date(lastClaimTime).toISOString().split("T")[0] : 0; // Проверка на null


  if (lastClaimDate && Date.parse(today) - Date.parse(lastClaimDate) === 86400000) { // Проверка на null
    const daily_reward = await getDailyReward(user?.daily_streak?.count + 1)
    try {
      await updateDoc(userRef, {
        daily_streak:{
          count:increment(1),
          last_claim_time: Date.parse(today) 
      },
      points: increment(daily_reward),
      total_points: increment(daily_reward)
      });
      return {daily_reward,last_claim_time:new Date().toISOString().split("T")[0],streak: user?.daily_streak?.count + 1 };
    } catch (error) {
      console.error("Error updating user clicks: ", error);
      return false;
    }
  } else if ( Date.parse(today) - Date.parse(lastClaimDate) > 1) {
    console.log('here')
    const daily_reward = await getDailyReward(1)
    try {
      await updateDoc(userRef, {
        daily_streak:{
          count:1,
          last_claim_time:Date.parse(today) 
      },
      points: increment(daily_reward),
      total_points: increment(daily_reward)
      });
      return {daily_reward,last_claim_time:new Date().toISOString().split("T")[0],streak:1};
    } catch (error) {
      console.error("Error updating user streak: ", error);
      return false;
    }
  } else {
    return false;
  }
}
