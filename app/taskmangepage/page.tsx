'use client';

import React, { useState, useEffect, useCallback } from 'react';
import './taskManagement.css';
import Image from 'next/image';
import logo from '../../public/images/logo.png';
import Link from 'next/link';

type Task = {
  id: number;
  clockIn: string;
  clockOut: string;
  workedHours: string;
  taskDescription: string;
  date: string;
};

type EmployeeProfile = {
  id: string; // <- updated from idNumber to id
  profileImage: string | null;
  firstName: string;
  lastName: string;
};

const timeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const formatMinutesToHoursDecimal = (totalMinutes: number): string => {
  if (totalMinutes <= 0) return '0.00';
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return (hours + mins / 60).toFixed(2);
};

export default function TaskManager() {
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [userProfile, setUserProfile] = useState<EmployeeProfile | null>(null);
  const [userName, setUserName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: 0,
    clockIn: '',
    clockOut: '',
    workedHours: '0.00',
    taskDescription: '',
    date: currentDate,
  });

  // Fetch profile
  useEffect(() => {
    const fetchLoggedInProfile = async () => {
      try {
        const token = localStorage.getItem('employeeToken');
        if (!token) return;

        const res = await fetch('http://localhost:5000/api/employees/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setUserProfile(data);
        setUserName(`${data.firstName} ${data.lastName}`);
      } catch (err: any) {
        console.error("❌ Error loading profile:", err.message || err);
      }
    };

    fetchLoggedInProfile();
  }, []);

  // Fetch tasks for employee by id
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('employeeToken');
      if (!token || !userProfile?.id) return;

      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${userProfile.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();

        const formatted = data.map((t: any) => ({
          id: t.id,
          clockIn: t.clockIn,
          clockOut: t.clockOut,
          workedHours: parseFloat(t.workedHours).toFixed(2),
          taskDescription: t.taskDescription,
          date: t.date.slice(0, 10),
        }));

        setTasks(formatted);
      } catch (err) {
        console.error("❌ Error fetching tasks:", err);
      }
    };

    if (userProfile) fetchTasks();
  }, [userProfile]);

  const calculateWorkedHours = useCallback((clockIn: string, clockOut: string): string => {
    const inMinutes = timeToMinutes(clockIn);
    const outMinutes = timeToMinutes(clockOut);
    return outMinutes > inMinutes ? formatMinutesToHoursDecimal(outMinutes - inMinutes) : '0.00';
  }, []);

  const handleNewTaskChange = (field: keyof Task, value: string) => {
    const updatedTask = { ...newTask, [field]: value };

    if (field === 'clockIn' || field === 'clockOut') {
      updatedTask.workedHours = calculateWorkedHours(
        field === 'clockIn' ? value : newTask.clockIn,
        field === 'clockOut' ? value : newTask.clockOut
      );
    }

    setNewTask(updatedTask);
  };

  const handleSaveNewTask = async () => {
    if (!newTask.taskDescription.trim() || !newTask.clockIn || !newTask.clockOut) {
      alert('Please fill in Clock In, Clock Out, and Task Description.');
      return;
    }

    const token = localStorage.getItem('employeeToken');
    if (!token || !userProfile?.id) {
      alert('Please login first.');
      return;
    }

    const taskToSend = {
      employeeId: userProfile.id,
      date: currentDate,
      clockIn: newTask.clockIn,
      clockOut: newTask.clockOut,
      workedHours: calculateWorkedHours(newTask.clockIn, newTask.clockOut),
      taskDescription: newTask.taskDescription,
    };

    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskToSend),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const savedTask = { ...taskToSend, id: Date.now() };
      setTasks((prev) => [...prev, savedTask as Task]);

      setNewTask({
        id: 0,
        clockIn: '',
        clockOut: '',
        taskDescription: '',
        workedHours: '0.00',
        date: currentDate,
      });
    } catch (error: any) {
      console.error("❌ Error saving task:", error.message);
      alert(`Failed to save task: ${error.message}`);
    }
  };

  const deleteTask = async (id: number) => {
    const token = localStorage.getItem('employeeToken');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("❌ Delete error:", error);
    }
  };

const handleSubmit = async () => {
  if (!userName.trim()) return alert('Please enter your name.');
  if (tasks.length === 0) return alert('Please add at least one task.');

  setSubmitting(true);

  try {
    const response = await fetch('http://localhost:5000/api/submit-timesheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, date: currentDate, tasks }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    alert('✅ Timesheet submitted to company email!');
  } catch (error: any) {
    console.error('❌ Submit error:', error.message);
    alert('Failed to submit timesheet: ' + error.message);
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="task-management-app">
      <header className="app-header">
        <div className="header-content">
          <div className="company-logo-container">
            <Image src={logo} alt="Logo" className="company-logo" />
          </div>
          <div className="profile-section">
            <span className="profile-greeting">Hello, {userProfile?.firstName ?? 'User'}!</span>
            <Link href="/editprofile">
              <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 shadow">
                {userProfile?.profileImage && (
                  <Image
                    src={`http://localhost:5000/uploads/${userProfile.profileImage}`}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </Link>
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
                        onChange={(e) => handleNewTaskChange('clockIn', e.target.value)}
                        className="time-input"
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={newTask.clockOut}
                        onChange={(e) => handleNewTaskChange('clockOut', e.target.value)}
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
                        placeholder="Describe your task"
                        value={newTask.taskDescription}
                        onChange={(e) => handleNewTaskChange('taskDescription', e.target.value)}
                        rows={2}
                      />
                    </td>
                    <td>
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

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Timesheet"}
              </button>
            </div>

            {/* Confirmation Modal */}
            {showSubmitConfirm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="modal-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12h6m-6 4h6M5 8h14M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2>Submit Timesheet</h2>
                    <p>Are you sure you want to submit your timesheet for <span>{currentDate || "this date"}</span>?</p>
                  </div>
                  <div className="modal-actions">
                    <button className="cancel-btn" onClick={() => setShowSubmitConfirm(false)}>Cancel</button>
                    <button className="submit-btn" onClick={() => {
                      setShowSubmitConfirm(false);
                      handleSubmit();
                    }}>
                      Confirm & Submit
                    </button>
                  </div>
                </div>
              </div>
            )}



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
                          <p><strong>Date:</strong> {task.date}</p>
                          <p><strong>Worked Hour:</strong> {task.workedHours} hours</p>
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
}
