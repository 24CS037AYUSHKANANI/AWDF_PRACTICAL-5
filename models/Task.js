const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: {
      values: ["low", "medium", "high"],
      message: "Priority must be low, medium, or high"
    },
    default: "low"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

taskSchema.pre("save", function(next) {
  this.title = this.title.trim();
  next();
});

module.exports = mongoose.model("Task", taskSchema);
