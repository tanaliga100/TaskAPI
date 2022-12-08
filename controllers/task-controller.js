const Task = require("../models/TaskSchema");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../class/error");
// POST request
const createTask = asyncWrapper(async (req, res, next) => {
  const TaskCollection = await Task.create(req.body);
  res.status(200).json({ TaskCollection, status: `Task added successfully` });
});
// GET request
const getTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  // res.status(200).json({ tasks });
  // res.status(200).json({ tasks, amount: tasks.length });
  // res.status(200).json({ tasks, success: true, amount: tasks.length });
  res.status(200).json({ data: { tasks, nbHits: tasks.length } });
});
// GET request
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id of: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});
// DELETE request
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const deleteTask = await Task.findOneAndDelete({ _id: taskID });
  if (!deleteTask) {
    return next(createCustomError(`No task with id of: ${taskID}`, 404));
  }
  res.status(200).json({
    deleteTask,
    status: `Task with id ${taskID} deleted successfully`,
  });
});
// PUT request
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id of: ${taskID}`, 404));
  }
  res.status(200).json({ task, status: `Successfully Updated` });
});
module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
