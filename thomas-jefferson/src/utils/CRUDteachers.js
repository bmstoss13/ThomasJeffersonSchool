import { db } from "../firebase"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc} from "firebase/firestore"

const teacherRef = collection(db, "teachers");

export const getAllTeachers = async () => {

  try{
    const data = await getDocs(teacherRef)
    const teachers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return teachers.sort((a, b) => {
      const lastNameComparison = a.last_name.localeCompare(b.last_name)
      return lastNameComparison !== 0 ? lastNameComparison : a.first_name.localeCompare(b.first_name)
    })
  }
  catch(e){
    console.log("There was an error while trying to retrieve all teachers:", e)
  }

};

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
}

export const getTeacher = async (id) => {

  try{
    const teacherDoc = doc(db, "teachers", id);
    const snap = await getDoc(teacherDoc);
    return snap.exists() ? { ...snap.data(), id: snap.id } : null;
  }
  catch(e){
    console.log("There was an error while trying to retrieve teacher:", e)
  }

};

export const addTeacher = async (teacher) => {

  try{
    return await addDoc(teacherRef, teacher)
  }
  catch(e){
    console.log("There was an error while trying to add teacher:", e)
  }

};

export const updateTeacher = async (id, updatedInfo) => {

  try{
    const teacherDoc = doc(db, "teachers", id)
    return await updateDoc(teacherDoc, updatedInfo)
  }
  catch(e){
    console.log("There was an error while trying to update the teacher's information", e)
  }
};

export const deleteTeacher = async (id) => {

  try{
    const teacherDoc = doc(db, "teachers", id)
    return await deleteDoc(teacherDoc)
  }
  catch(e){
    console.log("There was an error while trying to delete the teacher's data:", e)
  }

};