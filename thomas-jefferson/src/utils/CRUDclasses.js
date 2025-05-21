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

export const getClassById = async (id) => {
    const classRef = doc(db, 'classes', id);
    const classSnap = await getDoc(classRef);
  
    if (!classSnap.exists()) return null;
  
    const classData = classSnap.data();

    const studentRefs = classData.student || [];
  
    const studentDocs = await Promise.all(
        studentRefs.map(async (ref) => {
          const studentSnap = await getDoc(ref); // ref is already a DocumentReference
          if (studentSnap.exists()) {
            return { id: studentSnap.id, ...studentSnap.data() };
          } else {
            return null;
          }
        })
      );
  
    return {
      id: classSnap.id,
      ...classData,
      students: studentDocs.filter(s => s !== null),
    };
  };