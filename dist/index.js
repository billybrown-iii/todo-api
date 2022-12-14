"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("./models/todo");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
// let todos = [
//   {
//     text: "feed kitty",
//     priority: "important",
//     isCompleted: false,
//   },
// ]
app.get("/api/todos", (req, res) => {
    todo_1.default.find({}).then(result => {
        res.json(result);
    });
});
app.get("/api/todos/:id", (req, res, next) => {
    const id = req.params.id;
    todo_1.default.findById(id)
        .then(result => {
        if (!result)
            return res.status(404).json({ message: "Todo not found" });
        res.json(result);
    })
        .catch(err => next(err));
});
app.post("/api/todos", (req, res, next) => {
    const newTodo = Object.assign({}, req.body);
    newTodo.isCompleted = false;
    todo_1.default.create(newTodo)
        .then(result => {
        res.status(201).json(result);
    })
        .catch(err => next(err));
});
app.put("/api/todos/:id", (req, res, next) => {
    // only needs to pass in the changed parts, not the whole todo obj
    todo_1.default.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        .then(result => {
        if (!result)
            return res.status(404).json({ message: "Todo not found" });
        res.status(200).json(result);
    })
        .catch(err => next(err));
});
app.delete("/api/todos/:id", (req, res, next) => {
    todo_1.default.findByIdAndDelete(req.params.id)
        .then(result => {
        if (!result)
            return res.status(404).json({ message: "Todo not found" });
        res.status(202).json(result);
    })
        .catch(err => next(err));
});
// delete all
app.delete("/api/todos", (req, res, next) => {
    todo_1.default.deleteMany({})
        .then(result => {
        res.status(202).json(result);
    })
        .catch(err => next(err));
});
app.get("/info", (req, res, next) => {
    todo_1.default.countDocuments({})
        .then(result => {
        const count = result;
        res.send(`
        <div>Phone book has info for ${count} todos.</div>
    <div>Request made at ${new Date()}</div>
      `);
    })
        .catch(err => next);
});
const errorHandler = (err, req, res, next) => {
    // occurs when the mongoose validations fail
    if (err.name === "ValidatorError" || err.name === "ValidationError")
        return res.status(400).json({ message: err.message });
    // CastError occurs when searching for a malformed Id (an Id of an incorrect format/length)
    if (err.name === "CastError")
        return res.status(400).json({ message: "Malformed Id" });
    // occurs when invalid properties are passed to a Todo object
    if (err.name === "StrictModeError")
        return res.status(400).json({ message: err.message });
    // shouldn't reach this part
    console.log("Unhandled error in errorHandler function - index.ts");
    console.error(err);
    res.status(404).end();
};
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
