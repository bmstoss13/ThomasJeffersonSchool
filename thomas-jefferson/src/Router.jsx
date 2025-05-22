import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";
import Students from "./routes/students";
import CreateStudent  from './routes/CreateStudent';
import EditStudent    from './routes/EditStudent';
import Teachers from "./routes/teachers";
import CreateTeacher from "./routes/CreateTeacher";
import Calendar from "./routes/calendar";
import CreateEvent from "./routes/createEvent";
import ClassDashboard from './components/ClassDashboard';
import ClassDetail from './components/ClassDetail';


export const router = createBrowserRouter([

  { path: "/", element: <App /> }, //in app now, i am pointing to the log in page to begin with
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/students", element: <Students /> },
  { path: '/students/new', element: <CreateStudent /> },
  { path: '/students/:id/edit', element: <EditStudent /> },
  { path: "/teachers", element: <Teachers /> },
  { path: "/teachers/new", element: <CreateTeacher />},
  { path: "/calendar", element: <Calendar /> },
  { path: "/calendar/cevent", element: <CreateEvent/>},
  { path: "/classes", element: <ClassDashboard/>},
  

]);


