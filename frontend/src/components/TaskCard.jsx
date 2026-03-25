import API from "../api/axios";

const TaskCard = ({ task, fetchTasks, setEditTask }) => {
  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm mt-2">Status: {task.status}</p>
          <p className="text-sm">Priority: {task.priority}</p>
          <p className="text-sm">
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setEditTask(task)}
            className="btn btn-warning"
          >
            Edit
          </button>
          <button
            onClick={deleteTask}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;