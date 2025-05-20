import './App.css'
import './index.css'  //does it make a change? nope, use body in app.css
import Dashboard from './routes/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Dashboard />
  )
}

export default App
