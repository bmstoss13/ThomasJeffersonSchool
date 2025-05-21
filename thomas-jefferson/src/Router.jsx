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
import ClassDetail from './components/ClassDetail';


export const router = createBrowserRouter([
    { path: "/", element: <App/>},
    { path: "/dashboard", element: <Dashboard/>},
    { path: "/login", element: <Login/>},
    { path: "/students", element: <Students/>},
    { path: "/teachers", element: <Teachers/>},
    { path: "/calendar", element: <Calendar/>},
    { path: "/classes", element: <ClassDashboard /> },
  ]);