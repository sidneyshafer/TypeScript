import { RequestHandler } from "express";

import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({message: 'Created the todo.', createdTodo: newTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(200).json({todos: TODOS});
};

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = (req.body as {text: string}).text;

    const todoIdx = TODOS.findIndex(todo => todo.id = todoId);

    if (todoIdx < 0) {
        throw new Error('Could not find todo.');
    }

    TODOS[todoIdx] = new Todo(TODOS[todoIdx].id, updatedText);
    res.json({message: 'Resource updated successfully', updatedTodo: TODOS[todoIdx]});
};

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;
    const todoIdx = TODOS.findIndex(todo => todo.id = todoId);

    if (todoIdx < 0) {
        throw new Error('Could not find todo.');
    }

    TODOS.splice(todoIdx, 1);
    res.json({message: 'Resource deleted successfully.'});
};