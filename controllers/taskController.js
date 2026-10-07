const service = require("../services/taskService");

const missing = (res, message = "Task not found") =>
  res.status(404).json({
    success: false,
    studentId: "24CS037",
    error: message
  });

async function getAll(req, res, next) {
  try {
    const tasks = await service.list();
    res.status(200).json({
      success: true,
      studentId: "24CS037",
      total: tasks.length,
      data: tasks
    });
  } catch (err) { next(err); }
}

async function getOne(req, res, next) {
  try {
    if (!service.validId(req.params.id)) return missing(res, "Invalid task ID");
    const task = await service.one(req.params.id);
    if (!task) return missing(res);
    res.status(200).json({ success: true, studentId: "24CS037", data: task });
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const task = await service.add(req.body);
    res.status(201).json({
      success: true,
      studentId: "24CS037",
      message: "Task added successfully",
      data: task
    });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    if (!service.validId(req.params.id)) return missing(res, "Invalid task ID");
    const task = await service.edit(req.params.id, req.body);
    if (!task) return missing(res);
    res.status(200).json({
      success: true,
      studentId: "24CS037",
      message: "Task updated successfully",
      data: task
    });
  } catch (err) { next(err); }
}

async function destroy(req, res, next) {
  try {
    if (!service.validId(req.params.id)) return missing(res, "Invalid task ID");
    const task = await service.remove(req.params.id);
    if (!task) return missing(res);
    res.status(200).json({
      success: true,
      studentId: "24CS037",
      message: "Task removed successfully",
      data: task
    });
  } catch (err) { next(err); }
}

module.exports = { getAll, getOne, create, update, destroy };
