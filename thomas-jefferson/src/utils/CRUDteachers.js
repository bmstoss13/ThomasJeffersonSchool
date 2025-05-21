import { db } from "../firebase"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc,} from "firebase/firestore"

const teacherRef = collection(db, "teachers");

export const getAllTeachers = async () => {
  const data = await getDocs(teacherRef)
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
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