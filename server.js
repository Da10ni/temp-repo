const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let tasks = [
  { id: 1, title: "Setup project", done: true },
  { id: 2, title: "Push to GitHub", done: false },
  { id: 3, title: "Test deployment", done: false },
];
let nextId = 4;

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const task = { id: nextId++, title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.patch("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Not found" });
  if (req.body.title !== undefined) task.title = req.body.title;
  if (req.body.done !== undefined) task.done = req.body.done;
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== Number(req.params.id));
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
