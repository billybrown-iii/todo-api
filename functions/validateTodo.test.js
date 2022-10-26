const validateTodo = require("./validateTodo")

test("return false if todo is missing required property 'text'", () => {
  expect(validateTodo({ txt: "abc" })).toBe(false)
})

test("return false if todo's 'text' property is empty", () => {
  expect(validateTodo({ text: "" })).toBe(false)
})

test("return true if todo is valid", () => {
  expect(validateTodo({ text: "abc" })).toBe(true)
})
