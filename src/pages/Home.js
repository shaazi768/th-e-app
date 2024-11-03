// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseconfig';
import './Home.css';

function Home() {
  const [userName, setUserName] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: '', description: '', id: null });
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // State to show login success message

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email);
        setLoginSuccess(true); // Show success message on login
        setTimeout(() => setLoginSuccess(false), 3000); // Hide success message after 3 seconds
      } else {
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    setError('');
  };

  const handleAddTask = () => {
    if (task.title.trim() === '') {
      setError('Task title cannot be empty!');
      return;
    }
    const newTask = { ...task, id: Date.now() };
    setTasks([...tasks, newTask]);
    setTask({ title: '', description: '', id: null });
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    setTask(taskToEdit);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserName(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container py-5">
      {loginSuccess && (
        <div className="alert alert-success" role="alert">
          Successfully logged in!
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-5 greeting-text">Hello, {userName ? userName : 'Guest'}!</h1>
          <p className="lead text-muted">Organize your tasks below.</p>
        </div>
        {userName && (
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      <div className="task-input card p-4 mb-5 shadow border-0">
        <h4 className="mb-3">Add a New Task</h4>
        <input
          type="text"
          className="form-control mb-2"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Task Description (Optional)"
          value={task.description}
          onChange={handleInputChange}
        />
        {error && <div className="text-danger mb-2">{error}</div>}
        <button
          className="btn btn-primary w-100"
          onClick={handleAddTask}
        >
          {task.id ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div className="row">
        {tasks.length === 0 ? (
          <p className="text-center text-muted">No tasks added yet. Start by adding a new task!</p>
        ) : (
          tasks.map((t) => (
            <div key={t.id} className="col-md-6 col-lg-4 mb-4">
              <div className="task-card card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary">{t.title}</h5>
                  <p className="card-text text-muted">{t.description || 'No description provided.'}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleEditTask(t.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteTask(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
 




















