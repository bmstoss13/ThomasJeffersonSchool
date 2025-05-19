import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./routes/dashboard";

export const router = createBrowserRouter([
    { path: "/", element: <App/>},
    { path: "/dashboard", element: <Dashboard/>},
  ]);