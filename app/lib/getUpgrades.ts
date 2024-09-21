import { getDocs, collection } from "firebase/firestore";
import { db } from './firebaseConfig';
import { Upgrade } from "../../types";


export default async function getUpgrades() {
  try {
    const ref = collection(db, "upgrades");
    const upgradesSnapshot = await getDocs(ref);
    
    // Получаем массив улучшений с идентификаторами
    const upgrades = upgradesSnapshot.docs.map((doc) => ({
      id: doc.id,
      levels:{...doc.data() as Upgrade}
    }));

    return upgrades.flat();
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw error;
  }
}
