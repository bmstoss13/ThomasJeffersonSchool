import { db } from "../firebase"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc,} from "firebase/firestore"

const eventRef = collection(db, "events");

export const getAllEvents = async () => {
    try{
        
        const data = await getDocs(eventRef);
        console.log("Successful fetch");
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    }
    catch(e){
        console.log("There was an error: " , e);
    }
  
};

export const addEvent = async (event) => {
    try{
        console.log("Successful addition");
        return await addDoc(eventRef, event);
  
    }catch(e){
        console.log("There was an error: " , e);
    }
  
};

export const updateEvent = async (id, updatedInfo) => {
    try{
        const eventDoc = doc(db, "events", id)
        return await updateDoc(eventDoc, updatedInfo)
    }catch(e){
        console.log("There was an error: " , e);
    }  
};

export const deleteEvent = async (id) => {
  const eventDoc = doc(db, "events", id)
  return await deleteDoc(eventDoc)
};


