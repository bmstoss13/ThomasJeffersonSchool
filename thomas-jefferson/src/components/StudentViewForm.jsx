import { useState, useEffect } from 'react';
import { getAllClasses } from '../utils/CRUDstudents';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/StudentForm.css';

export default function StudentViewForm({ studentData = {} }) {
  const [classes, setClasses] = useState([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [studentClass, setStudentClass] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [isLoadingTeacher, setIsLoadingTeacher] = useState(false);
  const [error, setError] = useState(null);

  const student = {
    first_name: '',
    last_name: '', 
    birthday: '',
    grade: '',
    class_id: '',
    ...studentData
  };

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setError(null);
        const availableClasses = await getAllClasses();
        setClasses(availableClasses || []);

        if (student.class_id && availableClasses) {
          const foundClass = availableClasses.find(
            cls => String(cls.id) === String(student.class_id)
          );
          setStudentClass(foundClass || null);

          if (foundClass && foundClass.teacher) {
            loadTeacher(foundClass.teacher);
          }
        }
      } 
      catch(e) {
        console.error('Error loading classes:', e);
        setError('Failed to load class information');
      } 
      finally {
        setIsLoadingClasses(false);
      }
    };

    const loadTeacher = async (teacherRef) => {
      try {
        setIsLoadingTeacher(true);
        console.log('Loading teacher with reference:', teacherRef);

        let teacherId;
        if (typeof teacherRef === 'string' && teacherRef.includes('/teacher/')) {
          teacherId = teacherRef.split('/teacher/')[1];
          console.log('Extracted teacher ID from path:', teacherId);
        } 

        else if (typeof teacherRef === 'object' && teacherRef && teacherRef.id) {
          teacherId = teacherRef.id;
          console.log('Extracted teacher ID from object:', teacherId);
        } 

        else if (typeof teacherRef === 'string') {
          teacherId = teacherRef;
          console.log('Using direct teacher ID:', teacherId);
        }
        else {
          console.log('Unknown teacher reference format:', teacherRef);
          setTeacher(null);
          return;
        }
        
        if (teacherId) {
          console.log('Fetching teacher document with ID:', teacherId);
          const teacherDoc = doc(db, 'teachers', teacherId);
          const teacherSnap = await getDoc(teacherDoc);
          
          console.log('Teacher document exists:', teacherSnap.exists());
          
          if (teacherSnap.exists()) {
            const teacherData = teacherSnap.data();
            console.log('Teacher data retrieved:', teacherData);
            setTeacher(teacherData);
          } 
          else {
            console.log('Teacher document not found for ID:', teacherId);
            setTeacher(null);
          }
        } 
        else {
          console.log('No valid teacher ID extracted');
          setTeacher(null);
        }
      } 
      catch (err) {
        console.error('Error loading teacher:', err);
        setTeacher(null);
      } 
      finally {
        setIsLoadingTeacher(false);
      }
    };

    loadClasses();
  }, [student.class_id]);

  const getTeacherName = () => {
    console.log('Getting teacher name, current teacher state:', teacher);
    console.log('Is loading teacher:', isLoadingTeacher);
    
    if (isLoadingTeacher) {
      return 'Loading teacher...';
    } 
    if (teacher && teacher.first_name && teacher.last_name) {
      return `${teacher.first_name} ${teacher.last_name}`;
    } 
    else if (teacher && (teacher.first_name || teacher.last_name)) {
      return teacher.first_name || teacher.last_name;
    }
    return 'Not assigned';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="student-form">
      {/* <h2> */}
        {student.first_name || student.last_name 
          ? `${student.first_name} ${student.last_name}`.trim()
          : 'Student Information'
        }
      {/* </h2> */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-row">
        <label>First Name:</label>
        <div className="student-value">{student.first_name || 'Not provided'}</div>
      </div>

      <div className="form-row">
        <label>Last Name:</label>
        <div className="student-value">{student.last_name || 'Not provided'}</div>
      </div>

      <div className="form-row">
        <label>Birthday:</label>
        <div className="student-value">{formatDate(student.birthday)}</div>
      </div>

      <div className="form-row">
        <label>Grade (Score):</label>
        <div className="student-value">{student.grade || 'Not provided'}</div>
      </div>

      {isLoadingClasses ? (
        <div className="form-row">
          <label>Class Information:</label>
          <div className="student-value">Loading class information...</div>
        </div>
      ) : (
        <>
          <div className="form-row">
            <label>Teacher:</label>
            <div className="student-value">
              {getTeacherName()}
            </div>
          </div>

          <div className="form-row">
            <label>Grade Level:</label>
            <div className="student-value">
              {studentClass ? `Grade ${studentClass.grade}` : 'Not assigned'}
            </div>
          </div>

          <div className="form-row">
            <label>Room:</label>
            <div className="student-value">
              {studentClass && studentClass.room ? `Room ${studentClass.room}` : 'Not assigned'}
            </div>
          </div>

          <div className="form-row">
            <label>Class:</label>
            <div className="student-value">
              {studentClass 
                ? `Grade ${studentClass.grade} - ${getTeacherName()}${studentClass.room ? ` (Room ${studentClass.room})` : ''}`
                : 'Not assigned to a class'
              }
            </div>
          </div>
        </>
      )}

      <div className="readonly-note">
        <strong>Note:</strong> This is a read-only view of the student information.
      </div>
    </div>
  );
}