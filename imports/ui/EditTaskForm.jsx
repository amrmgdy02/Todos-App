import React, { useState } from "react";

export const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [text, setText] = useState(task.text);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    onSave({
      _id: task._id,
      text: text.trim(),
      dueDate: dueDate ? new Date(dueDate) : null,
    });
  };

  return (
    <form className="edit-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="modify the tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};