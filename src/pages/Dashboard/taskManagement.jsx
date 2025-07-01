import React, { useState, useCallback } from 'react';
import './taskManagement.css';
import logo from '../../assets/hirex_logo.png';

const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const formatMinutesToHoursDecimal = (totalMinutes) => {
  if (totalMinutes <= 0) return '0.00';
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return (hours + mins / 60).toFixed(2);
};

const TaskManagement = () => {
  const [userName, setUserName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    clockIn: '',
    clockOut: '',
    taskDescription: '',
    workedHours: '0.00',
    date: currentDate,
  });

  const calculateWorkedHours = useCallback((clockIn, clockOut) => {
    const inMinutes = timeToMinutes(clockIn);
    const outMinutes = timeToMinutes(clockOut);
    let worked = '0.00';
    if (outMinutes > inMinutes) {
      worked = formatMinutesToHoursDecimal(outMinutes - inMinutes);
    }
    return worked;
  }, []);

  const handleNewTaskChange = (field, value) => {
    const updatedTask = { ...newTask, [field]: value };
    
    if (field === 'clockIn' || field === 'clockOut') {
      updatedTask.workedHours = calculateWorkedHours(
        field === 'clockIn' ? value : newTask.clockIn,
        field === 'clockOut' ? value : newTask.clockOut
      );
    }
    
    setNewTask(updatedTask);
  };

  const handleSaveNewTask = () => {
    if (
      !newTask.taskDescription.trim() ||
      !newTask.clockIn ||
      !newTask.clockOut
    ) {
      alert('Please fill in Clock In, Clock Out, and Task Description.');
      return;
    }
    
    const taskToAdd = {
      ...newTask,
      id: Date.now(),
      date: currentDate,
      workedHours: calculateWorkedHours(newTask.clockIn, newTask.clockOut)
    };
    
    setTasks(prev => [...prev, taskToAdd]);
    setNewTask({
      clockIn: '',
      clockOut: '',
      taskDescription: '',
      workedHours: '0.00',
      date: currentDate,
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleSubmit = () => {
    if (!userName.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (tasks.length === 0) {
      alert('Please add at least one task.');
      return;
    }
    console.log('Submitting Timesheet:', { userName, currentDate, tasks });
    alert('Timesheet submitted! (Check console)');
  };

  return (
    <div className="task-management-app">
      <header className="app-header">
        <div className="header-content">
          <div className="company-logo-container">
            <img src={logo} alt="Hirex Company Logo" className="company-logo" />
          </div>
          <h1 className="company-title hidden">Hirex Task Manager</h1>
          <div className="profile-section">
            <span className="profile-greeting">Hello, {userName || 'User'}!</span>
            <div className="profile-avatar">{userName ? userName.charAt(0).toUpperCase() : 'U'}</div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="task-management-container">
          <div className="tm-card">
            <div className="tm-card-header">
              <h2>Daily Task Log</h2>
            </div>

            <div className="tm-user-info">
              <div className="form-group">
                <label htmlFor="userName">Name:</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="currentDate">Date:</label>
                <input
                  type="date"
                  id="currentDate"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>

            <div className="tm-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Clock In</th>
                    <th>Clock Out</th>
                    <th>Worked Hours</th>
                    <th>Task Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="time"
                        value={newTask.clockIn}
                        onChange={e => handleNewTaskChange('clockIn', e.target.value)}
                        className="time-input"
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={newTask.clockOut}
                        onChange={e => handleNewTaskChange('clockOut', e.target.value)}
                        className="time-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={newTask.workedHours}
                        readOnly
                        className="read-only-input worked-hours-input"
                      />
                    </td>
                    <td>
                      <textarea
                        className="task-description-input"
                        placeholder="Describe your task in detail"
                        value={newTask.taskDescription}
                        onChange={e => handleNewTaskChange('taskDescription', e.target.value)}
                        rows="2"
                      />
                    </td>
                    <td className="tm-actions">
                      <button 
                        onClick={handleSaveNewTask} 
                        className="tm-button tm-button-save" 
                        title="Save Task"
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="tm-form-actions">
              <button onClick={handleSubmit} className="tm-button tm-button-primary">
                Submit Timesheet
              </button>
            </div>
          </div>

          <div className="history-section">
            <div className="history-card">
              <h2>Task History</h2>
              <div className="history-list">
                {tasks.length > 0 ? (
                  <ul>
                    {tasks.map((task) => (
                      <li key={task.id} className="history-item">
                        <div className="history-item-header">
                          <p><strong>Date:</strong> {task.date || currentDate}</p>
                          <p><strong>Worked Hour:</strong> {Number(task.workedHours).toFixed(2)} hours</p>
                        </div>
                        <p><strong>Description:</strong> {task.taskDescription}</p>
                        <button 
                          onClick={() => deleteTask(task.id)} 
                          className="tm-button-icon tm-button-delete" 
                          title="Delete Task"
                        >
                          🗑️
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-history-message">No task history available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskManagement;