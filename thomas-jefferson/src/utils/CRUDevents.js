import { db } from "../../firebase"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc,} from "firebase/firestore"

const eventRef = collection(db, "students");

// export const getAllEvents = async () => {
//   const data = await getDocs(studentRef)
//   return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
// };