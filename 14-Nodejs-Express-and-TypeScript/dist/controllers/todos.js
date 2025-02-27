"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.status(200).json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIdx = TODOS.findIndex(todo => todo.id = todoId);
    if (todoIdx < 0) {
        throw new Error('Could not find todo.');
    }
    TODOS[todoIdx] = new todo_1.Todo(TODOS[todoIdx].id, updatedText);
    res.json({ message: 'Resource updated successfully', updatedTodo: TODOS[todoIdx] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIdx = TODOS.findIndex(todo => todo.id = todoId);
    if (todoIdx < 0) {
        throw new Error('Could not find todo.');
    }
    TODOS.splice(todoIdx, 1);
    res.json({ message: 'Resource deleted successfully.' });
};
exports.deleteTodo = deleteTodo;
