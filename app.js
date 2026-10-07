require("dotenv").config();

const express = require("express");
const connectDatabase = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[24CS037] ${req.method} ${req.originalUrl} | ${new Date().toISOString()}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    student: "Ayush Kanani",
    studentId: "24CS037",
    practical: "AWDF Practical 5",
    status: "MongoDB Task API online"
  });
});

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    studentId: "24CS037",
    error: "API route not found",
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  console.error(`[24CS037] ${err.name}: ${err.message}`);

  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json({
      success: false,
      studentId: "24CS037",
      error: "Task validation failed",
      details
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      studentId: "24CS037",
      error: "Invalid database value"
    });
  }

  res.status(500).json({
    success: false,
    studentId: "24CS037",
    error: "Internal server error"
  });
});

async function start() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log("--------------------------------------------");
      console.log("AWDF Practical 5 | Ayush Kanani | 24CS037");
      console.log(`API: http://localhost:${PORT}`);
      console.log("MongoDB: READY");
      console.log("--------------------------------------------");
      console.log(`GET    http://localhost:${PORT}/tasks`);
      console.log(`POST   http://localhost:${PORT}/tasks`);
      console.log(`PUT    http://localhost:${PORT}/tasks/:id`);
      console.log(`DELETE http://localhost:${PORT}/tasks/:id`);
    });
  } catch (err) {
    console.error("Unable to start the API:", err.message);
    process.exit(1);
  }
}

start();
