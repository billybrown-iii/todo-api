"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
require("dotenv").config();
const uri = `mongodb+srv://link8495:${process.env.mongopw}@cluster0.twjtj.mongodb.net/todos?retryWrites=true&w=majority`;
mongoose
    .connect(uri)
    .then(result => {
    console.log("Connected to MongoDB");
})
    .catch(err => {
    console.log("Err: " + err.message);
});
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        minLength: 1,
        required: true,
    },
    priority: {
        type: String,
        validate: {
            validator: v => {
                return /^(Urgent|Backburner)$/.test(v);
            },
            message: "Priority must be 'Urgent' or 'Backburner'",
        },
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
}, { strict: "throw" });
const Todo = mongoose.model("Todo", todoSchema);
exports.default = Todo;
