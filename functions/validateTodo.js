const validateTodo = todo => {
  if (!todo.text) return false
  return true
}

module.exports = validateTodo
