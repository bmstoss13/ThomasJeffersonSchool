import { db } from "../../firebase"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc,} from "firebase/firestore"

const eventRef = collection(db, "events");

// export const getAllEvents = async () => {
//   const data = await getDocs(studentRef)
//   return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
// };

export const addEvent = async (event) => {
  return await addDoc(eventRef, event)
};