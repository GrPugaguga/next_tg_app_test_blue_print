import { doc, updateDoc,increment } from "firebase/firestore";
import { db } from './firebaseConfig';
import getUserData from "./getUserData";
export default async function recharge(id: string | number ) {
  const userRef = doc(db, "users", String(id));
  const user = await getUserData(String(id))
  if(user && user.boosters.recharge.count > 0){
  try {
        await updateDoc(userRef, {
          energy: user.max_energy,
          [`boosters.recharge.count`]: increment(-1) // Уменьшаем количество бустера на 1
        });
        const updatedUser = await getUserData(String(id));
        return updatedUser
  } catch (error) {
    console.error("Error recharging: ", error);
    return false;
        }
}
else{
    return false
}
}
