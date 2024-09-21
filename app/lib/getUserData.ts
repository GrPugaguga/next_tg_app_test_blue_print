import { getDoc, doc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { User } from "../../types";


export default async function getUserData(id: string): Promise<User | false> {
  try {
    const userRef = doc(db, "users", String(id));
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data() as User;
      return userData;
    } else {
        return false
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw error;
  }
}
