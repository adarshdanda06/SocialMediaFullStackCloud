import React from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';
//import LoginPage from './pages/LoginPage';

function App() {

  return (<div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>); 
}

export default App;