import { db } from "../firebase"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc,} from "firebase/firestore"

const teacherRef = collection(db, "teachers");

export const getAllTeachers = async () => {
  const data = await getDocs(teacherRef)
  const teachers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  return teachers.sort((a, b) => {
    const lastNameComparison = a.last_name.localeComparison(b.last_name)
    return lastNameComparison !== 0 ? lastNameComparison : a.first_name.localeComparison(b.first_name)
  })
};

export const addTeacher = async (teacher) => {
  return await addDoc(teacherRef, teacher)
};

export const updateTeacher = async (id, updatedInfo) => {
  const teacherDoc = doc(db, "teachers", id)
  return await updateDoc(teacherDoc, updatedInfo)
};

export const deleteTeacher = async (id) => {
  const teacherDoc = doc(db, "teachers", id)
  return await deleteDoc(teacherDoc)
};