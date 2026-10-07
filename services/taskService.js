const mongoose = require("mongoose");
const Task = require("../models/Task");

const validId = id => mongoose.isValidObjectId(id);

const list = () => Task.find().sort({ createdAt: -1 });
const one = id => validId(id) ? Task.findById(id) : null;
const add = data => Task.create(data);
const edit = (id, data) => validId(id)
  ? Task.findByIdAndUpdate(id, data, { new: true, runValidators: true })
  : null;
const remove = id => validId(id) ? Task.findByIdAndDelete(id) : null;

module.exports = { validId, list, one, add, edit, remove };
