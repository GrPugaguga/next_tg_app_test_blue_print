import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from './firebaseConfig';

export default async function setUserAvatar(id: string | number, photoPath: string ) {
  const userRef = doc(db, "users", String(id));
  try {
    await updateDoc(userRef, {
        avatar: photoPath
    });
    return true;
  } catch (error) {
    console.error("Error updating user clicks: ", error);
    return false;
  }
}
