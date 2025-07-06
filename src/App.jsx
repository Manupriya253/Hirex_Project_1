import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManagement from './pages/Dashboard/taskManagement';
import ProfileUpdate from './pages/Profile/profileupdate';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<TaskManagement />} />
        <Route path="/profile" element={<ProfileUpdate />} />
       
      
      </Routes>
    </Router>
  );
}

export default App;