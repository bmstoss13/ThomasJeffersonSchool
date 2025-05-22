import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase"; 

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

export const getClassById = async (id) => {
    const classRef = doc(db, 'classes', id);
    const classSnap = await getDoc(classRef);
  
    if (!classSnap.exists()) return null;
  
    const classData = classSnap.data();

    const studentRefs = Array.isArray(classData.student) ? classData.student : [];


    const { id: _ignore, ...rest } = classData;

    const defaultData = {
      teacher: 'Ms. New',
      grade: 3,
      room: 101,
      students: [],  
    };

    const studentDocs = await Promise.all(
        studentRefs.map(async (refPath) => {
          const studentRef = typeof refPath === 'string' ? doc(db, refPath) : refPath;
          const snap = await getDoc(studentRef); 
            return { id: snap.id, ...snap.data() };
        })
      );
  
    return {
      id: classSnap.id,
      ...rest,
      students: studentDocs.filter(Boolean),
    };
  };

  export const addClass = async (data) => {
    await addDoc(collection(db, "classes"), data);
  };