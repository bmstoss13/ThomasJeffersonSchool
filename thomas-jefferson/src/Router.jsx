import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";
import Students from "./routes/students";
import CreateStudent  from './routes/CreateStudent';
import EditStudent    from './routes/EditStudent';
import Teachers from "./routes/teachers";
import Calendar from "./routes/calendar";
import ClassDashboard from './components/ClassDashboard';


export const router = createBrowserRouter([

  { path: "/", element: <App /> }, //in app now, i am pointing to the log in page to begin with
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/students", element: <Students /> },
  { path: '/students/new', element: <CreateStudent /> },
  { path: '/students/:id/edit', element: <EditStudent /> },
  { path: "/teachers", element: <Teachers /> },
  { path: "/calendar", element: <Calendar /> },
  { path: "/classes", element: <ClassDashboard />}
  
]);

