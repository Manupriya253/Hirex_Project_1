import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManagement from './pages/Dashboard/taskManagement';
import HireXDashboard from './pages/Dashboard/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HireXDashboard />} />
        <Route path="/tasks" element={<TaskManagement />} />
      </Routes>
    </Router>
  );
}

export default App;