import { db } from "../firebase"
import { collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot} from "firebase/firestore"

const studentRef = collection(db, "students");
const classRef = collection(db, "classes");

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

}

export const getAllClasses = async () => {
 
  try{
    const querySnapshot = await getDocs(collection(db, "classes"));
    const classes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return classes.sort((a, b) => {
      const gradeComparison = a.grade - b.grade
      return gradeComparison !== 0 ? gradeComparison : a.room?.localeCompare(b) || 0;
    })
  }
  catch(e){
    console.log("There was an error retrieving all classes", e)
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

}

export const classExists = async (classId) => {

  try {
    const classDoc = doc(db, "classes", classId);
    const snap = await getDoc(classDoc);
    return snap.exists();
  }
  catch(e) {
    console.log("There was an error while checking if class exists:", e);
    return false;
  }
}

export const addStudent = async (student) => {
  
  try {
    if (student.class_id) {
      const classValid = await classExists(student.class_id);
      if (!classValid) {
        throw new Error(`Class with ID ${student.class_id} does not exist`);
      }
    }
    
    return await addDoc(studentRef, student);
  }
  catch(e) {
    console.log("There was an error while trying to add student:", e);
    throw e; 
  }
}

export const updateStudent = async (id, updatedInfo) => {
  
  try {
    if (updatedInfo.class_id) {
      const classValid = await classExists(updatedInfo.class_id);
      if (!classValid) {
        throw new Error(`Class with ID ${updatedInfo.class_id} does not exist`);
      }
    }
    
    const studentDoc = doc(db, "students", id);
    return await updateDoc(studentDoc, updatedInfo);
  }
  catch(e) {
    console.log("There was an error while trying to update the student's information", e);
    throw e;
  }
}

export const deleteStudent = async (id) => {

  try{
    const studentDoc = doc(db, "students", id)
    return await deleteDoc(studentDoc)
  }
  catch(e){
    console.log("There was an error while trying to delete the student's data:", e)
  }

};