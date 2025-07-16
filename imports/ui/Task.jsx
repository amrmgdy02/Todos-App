import React from "react";

export const Task = ({ task, onCheckboxClick, onUpdateClick, onDeleteClick }) => {
  const currentDate = new Date();
  let isUrgent = false;
  let isPassed = false;
  if (task.dueDate) {
    const dueDate = new Date(task.dueDate);
    const timeDiff = dueDate - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    isUrgent = daysRemaining <= 2 && daysRemaining >= 0;
    isPassed = dueDate < currentDate;
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      {task.dueDate && 
      <span className={`due-date ${isUrgent && !task.isChecked ? 'urgent' : ''}
      ${isPassed && !task.isChecked ? 'passed' : ''} ${task.isChecked ? 'completed' : ''}`}>
      Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
      <button className="update-button" onClick={() => onUpdateClick(task)}>✏️</button>
      <button className="delete-button" onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};