const express = require("express");
const {
  createTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
} = require("../controllers/task-controller");
const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
