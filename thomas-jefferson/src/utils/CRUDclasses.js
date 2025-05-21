import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; 

export const getAllClasses = async () => {
    const querySnapshot = await getDocs(collection(db, "classes"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteClass = async (id) => {
    await deleteDoc(doc(db, "classes", id));
};

export const updateClass = async (id, data) => {
    await updateDoc(doc(db, "classes", id), data);
};
