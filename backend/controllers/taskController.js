const Task = require("../models/Task");

// Create Task
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status,
      priority,
      dueDate
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get Tasks with filter/search/sort/pagination
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sortBy = "createdAt", order = "desc", page = 1, limit = 5 } = req.query;

    const query = { user: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: "i" };

    const tasks = await Task.find(query)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

// Update Task
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Delete Task
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Analytics
const getTaskAnalytics = async (req, res, next) => {
  try {
    const total = await Task.countDocuments({ user: req.user._id });
    const completed = await Task.countDocuments({ user: req.user._id, status: "Done" });
    const pending = await Task.countDocuments({
      user: req.user._id,
      status: { $ne: "Done" }
    });

    const completionPercentage = total > 0 ? ((completed / total) * 100).toFixed(2) : 0;

    res.json({
      total,
      completed,
      pending,
      completionPercentage
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskAnalytics
};