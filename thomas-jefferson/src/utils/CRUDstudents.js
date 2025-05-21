import { db } from "../firebase"
import { collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot} from "firebase/firestore"

const studentRef = collection(db, "students");

export const getAllStudents = async () => {
  const data = await getDocs(studentRef)
  const students = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  return students.sort((a, b) => {
    const lastNameComparison = a.last_name.localeCompare(b.last_name)
    return lastNameComparison !== 0 ? lastNameComparison : a.first_name.localeCompare(b.first_name)
  })
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
