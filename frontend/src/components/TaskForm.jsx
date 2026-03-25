import { useState } from "react";
import API from "../api/axios";

const TaskForm = ({ fetchTasks, editTask, setEditTask }) => {
  const [form, setForm] = useState(
    editTask || {
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      dueDate: ""
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, form);
        setEditTask(null);
      } else {
        await API.post("/tasks", form);
      }

      setForm({
        title: "",
        description: "",
        status: "Todo",
        priority: "Medium",
        dueDate: ""
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-xl font-bold mb-3">{editTask ? "Edit Task" : "Create Task"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        className="input"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={form.description}
        className="w-full border p-2 mb-2"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
        <select
          value={form.status}
          className="border p-2"
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          value={form.priority}
          className="border p-2"
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          value={form.dueDate ? form.dueDate.slice(0, 10) : ""}
          className="input"
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
      </div>

      <button className="btn btn-primary">
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;