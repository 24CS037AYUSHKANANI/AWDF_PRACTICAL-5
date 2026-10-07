# AWDF Practical 5 - MongoDB Task Manager - 24CS037

Student: Ayush Kanani  
Roll No.: 24CS037  
Subject: Advanced Web Development Frameworks (ITUE301)

## Features
- MongoDB connection using Mongoose
- Required/default Task schema fields
- CRUD using Mongoose model methods
- Priority enum: low, medium, high
- Automatic title trimming
- GET /tasks/:id with 404 handling
- Structured Mongoose validation errors
- .env based database configuration

## Structure
```text
24CS037_task-manager-mongodb/
├── config/database.js
├── controllers/taskController.js
├── models/Task.js
├── routes/taskRoutes.js
├── services/taskService.js
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Setup
```bash
npm install
```

Copy `.env.example` to `.env` and add your MongoDB URI.

Atlas example:
```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/awdf_24cs037?retryWrites=true&w=majority
PORT=5000
```

Local MongoDB:
```env
MONGO_URI=mongodb://127.0.0.1:27017/awdf_24cs037
PORT=5000
```

Start:
```bash
npm start
```

## Endpoints
```text
GET    http://localhost:5000/tasks
GET    http://localhost:5000/tasks/:id
POST   http://localhost:5000/tasks
PUT    http://localhost:5000/tasks/:id
DELETE http://localhost:5000/tasks/:id
```

POST example:
```json
{
  "title": "   Study Mongoose   ",
  "description": "Practice MongoDB and schema validation",
  "completed": false,
  "priority": "high"
}
```

The title is trimmed before saving.

An invalid priority such as `"urgent"` or a POST without `title` produces structured validation JSON.

## Persistence
Create a task, verify it in MongoDB Compass/Atlas, restart the server, and run GET `/tasks`. The task remains because it is stored in MongoDB.

## GitHub
Recommended repository:
```text
task-manager-api-24cs037
```

Suggested commit:
```text
feat: add MongoDB and Mongoose integration for 24CS037
```

Never commit `.env`.

## Deployment
GitHub stores the source but does not run Express. Deploy the API on a Node.js platform such as Render and configure `MONGO_URI` as an environment variable. MongoDB Atlas can provide the hosted database.
