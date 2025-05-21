import { db } from "../firebase"
import { collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc,} from "firebase/firestore"

const studentRef = collection(db, "students");

export const getAllStudents = async () => {
  const data = await getDocs(studentRef)
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
};

export const getStudent = async (id) => {
  const studentDoc = doc(db, "students", id);
  const snap = await getDoc(studentDoc);
  return snap.exists() ? { ...snap.data(), id: snap.id } : null;
};


export const addStudent = async (student) => {
  return await addDoc(studentRef, student)
};

export const updateStudent = async (id, updatedInfo) => {
  const studentDoc = doc(db, "students", id)
  return await updateDoc(studentDoc, updatedInfo)
};

export const deleteStudent = async (id) => {
  const studentDoc = doc(db, "students", id)
  return await deleteDoc(studentDoc)
};
