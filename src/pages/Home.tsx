import { useEffect, useState } from 'react';
import type { TodoItem, CreateTodoRequest, ProblemDetails } from '../types/todo';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todoApi';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';
import { Container, Typography, Alert } from '@mui/material';
import {toast} from "react-toastify";

export const Home = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTodos()
            .then(setTodos)
            .catch((err: ProblemDetails) => {
                console.error(err);
                setError(err.detail || 'An unexpected error occurred');
            });
    }, []);

    const handleAdd = async (title: string) => {
        try {
            const newTodo = await createTodo({ title, isCompleted: false } as CreateTodoRequest);
            setTodos(prev => [...prev, newTodo]);
            toast.success('Todo added successfully!');
        } catch (err: unknown) {
            const problem = err as ProblemDetails;
            const message = problem.errors?.map(e => e.description).join(', ') || problem.detail || 'Unexpected error';
            toast.error(message);
        }
    };

    const handleToggle = async (todo: TodoItem) => {
        try {
            const updated = await updateTodo(todo.id, { title: todo.title, isCompleted: !todo.isCompleted });
            setTodos(prev => prev.map(t => t.id === updated.id ? updated : t));
            toast.info('Todo updated!');
        } catch (err: unknown) {
            const problem = err as ProblemDetails;
            toast.error(problem.detail || 'Unexpected error');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(prev => prev.filter(t => t.id !== id));
            toast.success('Todo deleted!');
        } catch (err: unknown) {
            const problem = err as ProblemDetails;
            toast.error(problem.detail || 'Unexpected error');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Todo List</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TodoForm onSubmit={handleAdd} />
            <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
        </Container>
    );
};
