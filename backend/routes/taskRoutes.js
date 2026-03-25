const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskAnalytics
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createTask).get(protect, getTasks);
router.get("/analytics", protect, getTaskAnalytics);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;