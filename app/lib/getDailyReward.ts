import { doc, getDoc } from "firebase/firestore";
import { db } from './firebaseConfig';

export default async function getDailyReward(streak:number) {
  const ref = doc(db, "rewards", 'daily_rewards');
  const snapshot = await getDoc(ref); 
    if(snapshot.exists()){
      const data = snapshot.data()
      return data[`${streak}`]
    }else{
      return false
    }
}
