import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from './firebaseConfig';

export default async function setUserClick(id: string | number, points_increment: number,energy:number,timestamp:number ) {
  const userRef = doc(db, "users", String(id));
  try {
    await updateDoc(userRef, {
      energy: energy,
      points: increment(points_increment),
      total_points: increment(points_increment),
      last_sync_timestamp: timestamp
    });
    return true;
  } catch (error) {
    console.error("Error updating user clicks: ", error);
    return false;
  }
}
