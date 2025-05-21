import { db } from "../firebase"
import { collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot} from "firebase/firestore"

const studentRef = collection(db, "students");

export const getAllStudents = async () => {

  try{
    const data = await getDocs(studentRef)
    const students = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return students.sort((a, b) => {
      const lastNameComparison = a.last_name.localeCompare(b.last_name)
      return lastNameComparison !== 0 ? lastNameComparison : a.first_name.localeCompare(b.first_name)
    })
  }
  catch(e){
    console.log("There was an error while trying to retrieve all students:", e)
  }

};

export const getStudent = async (id) => {

  try{
    const studentDoc = doc(db, "students", id);
    const snap = await getDoc(studentDoc);
    return snap.exists() ? { ...snap.data(), id: snap.id } : null;
  }
  catch(e){
    console.log("There was an error while trying to retrieve student:", e)
  }

};

export const addStudent = async (student) => {

  try{
    return await addDoc(studentRef, student)
  }
  catch(e){
    console.log("There was an error while trying to add student:", e)
  }

};

export const updateStudent = async (id, updatedInfo) => {

  try{
    const studentDoc = doc(db, "students", id)
    return await updateDoc(studentDoc, updatedInfo)
  }
  catch(e){
    console.log("There was an error while trying to update the student's information", e)
  }
};

export const deleteStudent = async (id) => {

  try{
    const studentDoc = doc(db, "students", id)
    return await deleteDoc(studentDoc)
  }
  catch(e){
    console.log("There was an error while trying to delete the student's data:", e)
  }

};
