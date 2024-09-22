import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from './firebaseConfig';
import getUserData from "./getUserData";

export default async function recharge(id: string | number) {
  const userRef = doc(db, "users", String(id));
  
    try {
      // Находим индекс нужного бустера
      const user = await getUserData(String(id))            
      // Если бустер найден, используем increment для уменьшения его количества
      if(user && user.boosters.multitouch.count > 0){   
        await updateDoc(userRef, {
          [`boosters.multitouch.count`]: increment(-1) ,// Уменьшаем количество бустера на 1,
            booster_expirated_time: Date.now() + 1000 * 60,
        });
        const updatedUser = await getUserData(String(id));
        return updatedUser
      }
      else{
        return false
      }
    } catch (error) {
      console.error("Error activating multitouch: ", error);
      return false;
    }

}
