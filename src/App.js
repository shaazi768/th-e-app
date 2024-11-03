// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home'; // Import Home

import Navbar from './components/Navbar'; // Import Navbar
import Footer from './components/Footer'; 

function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* Add Home route */}
       
        
      </Routes>
    </Router>
  );
}

export default App;
