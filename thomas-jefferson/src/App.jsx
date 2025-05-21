import './App.css'
import './index.css'  //does it make a change? nope, use body in app.css
import Login from './routes/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Login />
    </>
  );
}

export default App
