import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from './firebaseConfig';
import { User } from '../../types';

export default async function setNewUpgrate(user: User, upgrate: any) {
  const userRef = doc(db, "users", String(user.id));
  
  try {
    // Проверяем, есть ли уже улучшение с данным ID
    const existingUpgrade = user.upgrades.find(up => up.id === upgrate.id);

    if (existingUpgrade) {
      // Если улучшение существует, обновляем уровень
      await updateDoc(userRef, {
        ...user,
        points: increment(-upgrate.level.price),
        [`${upgrate.id}`]: upgrate.level.value,
        upgrades: user.upgrades.map(up => 
          up.id === upgrate.id ? { ...up, level: upgrate.level } : up
        )
      });
    } else {
      // Если улучшение не существует, добавляем новое
      await updateDoc(userRef, {
        ...user,
        points: increment(-upgrate.level.price),
        [`${upgrate.id}`]: upgrate.level.value,
        upgrades: [...user.upgrades, {
          id: upgrate.id,
          level: upgrate.level
        }]
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error updating user clicks: ", error);
    return false;
  }
}
