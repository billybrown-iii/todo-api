const express = require("express")
const validateTodo = require("./functions/validateTodo")
const app = express()

app.use(express.json())

let todos = [
  {
    text: "feed kitty",
  },
]

app.get("/api/todos", (req, res) => {
  res.json(todos)
})

app.post("/api/todos", (req, res) => {
  const newTodo = req.body
  if (!validateTodo(newTodo)) return res.status(404).end()
  todos = [...todos, newTodo]
  res.status(201).json(newTodo)
})

module.exports = app
