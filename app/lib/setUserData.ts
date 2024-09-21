import { doc, updateDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { User } from '../../types';

export default async function setUserAvatar(user: User ) {
  const userRef = doc(db, "users", String(user.id));
  
  try {
    await updateDoc(userRef, {
        ...user
    });
    return true;
  } catch (error) {
    console.error("Error updating user clicks: ", error);
    return false;
  }
}
