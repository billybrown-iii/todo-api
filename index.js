const express = require("express")
const validateTodo = require("./functions/validateTodo")
const Todo = require("./models/todo")
const app = express()

app.use(express.json())

// let todos = [
//   {
//     text: "feed kitty",
//     priority: "important",
//     isCompleted: false,
//   },
// ]

app.get("/api/todos", (req, res) => {
  Todo.find({}).then(result => {
    res.json(result)
  })
})

app.post("/api/todos", (req, res, next) => {
  const newTodo = new Todo(req.body)
  newTodo.isCompleted = false
  newTodo
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => next(err))
})

app.delete("/api/todos", (req, res, next) => {
  Todo.deleteMany({})
    .then(result => {
      res.status(202).json(result)
    })
    .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidatorError" || err.name === "ValidationError")
    return res.status(400).json({ message: err.message })

  // shouldn't reach this part
  console.error(err)
  res.status(404).end()
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
