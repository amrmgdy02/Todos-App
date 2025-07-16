import React, { useState, Fragment } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';
import { LoginForm } from './LoginForm.jsx';
import { RegistrationForm } from './RegistrationForm.jsx';
import { TasksCollection } from '../api/TasksCollection.js';
import { EditTaskForm } from './EditTaskForm.jsx';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const hideCompletedTasks = { isChecked: { $ne: true } };

  const [isRegistering, setIsRegistering] = useState(true);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleUpdate = (task) => {
    setEditingTask(task);
  };

  const handleSaveUpdate = ({ _id, text, dueDate }) => {
    Meteor.callAsync("tasks.update", { _id, text, dueDate });
    setEditingTask(null);
  };

  const handleToggleChecked = ({ _id, isChecked }) => {
    Meteor.callAsync("tasks.toggleChecked", { _id, isChecked });
  };
  const handleDelete = ({ _id }) =>
    Meteor.callAsync("tasks.delete", _id);

  const isLoading = useSubscribe('tasks');
  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedTasks : {}, { sort: { createdAt: -1 } }).fetch()
  );

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <h1>📝️ Todo List</h1>
      {user ? (
        <Fragment>
          <button className="logout-button" onClick={() => Meteor.logout()}>Log Out</button>
          <TaskForm />
          {editingTask && (
          <EditTaskForm 
            task={editingTask} 
            onSave={handleSaveUpdate}
            onCancel={() => setEditingTask(null)}
          />
          )}
          <div className="filter">
            <button className="filter-button" onClick={() => setHideCompleted(!hideCompleted)}>
              {hideCompleted ? 'Show All' : 'Hide Completed'}
            </button>
          </div>
          <ul className="tasks">
            {tasks.map(task => (
              <Task
                key={task._id}
                task={task}
                onDeleteClick={handleDelete}
                onCheckboxClick={handleToggleChecked}
                onUpdateClick={handleUpdate}
              />
            ))}
          </ul>
        </Fragment>
      ) : (
        <Fragment>
          {isRegistering ? <RegistrationForm /> : <LoginForm />}
          <p>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <button className="toggle-button" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Login" : "Register"}
            </button>
          </p>
        </Fragment>
      )}
    </div>
  );
};
