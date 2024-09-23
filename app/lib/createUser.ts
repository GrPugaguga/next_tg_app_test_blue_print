import { setDoc, doc, getDoc ,updateDoc, increment} from "firebase/firestore";
import { db } from './firebaseConfig';
import { User } from "../../types";

export default async function createUser(user: User) {
    console.log(user, 'from createUser.ts')
    try {
        const userRef = doc(db, "users", String(user.id));
        await setDoc(userRef, user);
        if(user.refer_parent_id){
            const referParentRef = doc(db, "users", String(user.refer_parent_id));
            const userSnapshot = await getDoc(referParentRef);
            const referData = userSnapshot.data() as User;
            await updateDoc(referParentRef, {
                points: increment(referData.points_per_click * 1000),
                total_points: increment(referData.points_per_click * 1000),
                boosters:{
                    multitouch:{count:referData.boosters.multitouch.count + 1},
                    recharge:{count:referData.boosters.recharge.count + 1},
                },
                referalsIds: [...referData.referalsIds, user.id]
            });
        }
        return true;
    } catch (error) {
        console.error("Error fetching user data: ", error);
        throw error;
    }
}
