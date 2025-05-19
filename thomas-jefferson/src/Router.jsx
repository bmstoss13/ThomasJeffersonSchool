import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";

export const router = createBrowserRouter([
    { path: "/", element: <App/>},
    { path: "/dashboard", element: <Dashboard/>},
    { path: "/login", element: <Login/>}
  ]);