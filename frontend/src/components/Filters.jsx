const Filters = ({ filters, setFilters }) => {
  return (
    <div className="card grid grid-3">
      <input
        type="text"
        placeholder="Search by title"
        className="border p-2"
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <select
        className="border p-2"
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <select
        className="border p-2"
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        className="border p-2"
        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
      >
        <option value="createdAt">Sort by Created</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
      </select>
    </div>
  );
};

export default Filters;