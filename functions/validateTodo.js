const validateTodo = todo => {
  if (!todo.text) return false
  //   if (todo.text?.length === 0) return false
  return true
}

module.exports = validateTodo
