import type {CreateTodoRequest, TodoItem, UpdateTodoRequest} from "../types/todo.ts";
import {handleApiResponse} from "./apiHelper.ts";

const API_BASE = `http://localhost:5000/api/todo`;

export async function getTodos(): Promise<TodoItem[]> {
    const res = await fetch(API_BASE);
    return handleApiResponse(res);
}

export async function createTodo(todo: CreateTodoRequest): Promise<TodoItem> {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
    return handleApiResponse(res);
}

export async function updateTodo(id: number, todo: UpdateTodoRequest): Promise<TodoItem> {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
    return handleApiResponse(res);
}

export async function deleteTodo(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    return handleApiResponse(res);
}