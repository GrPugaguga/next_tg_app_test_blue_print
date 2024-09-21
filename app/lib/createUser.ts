import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { User } from "../../types";

export default async function createUser(user: User) {
    console.log(user, 'from createUser.ts')
    try {
        const userRef = doc(db, "users", String(user.id));
        await setDoc(userRef, user);
        return true;
    } catch (error) {
        console.error("Error fetching user data: ", error);
        throw error;
    }
}
