import { useEffect, useState } from "react";
import type { TodoItem, CreateTodoRequest, ProblemDetails } from "../types/todo";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";
import { TodoList } from "../components/TodoList";
import { TodoForm } from "../components/TodoForm";
import {Container, Typography, Alert, Pagination, Stack, ToggleButtonGroup, ToggleButton, Box} from "@mui/material";
import { toast } from "react-toastify";
import { Footer } from "../components/Footer";
import {Header} from "../components/Header.tsx";

export const Home = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [ filter, setFilter ] = useState<"all" | "completed" | "pending">("all");
    const itemsPerPage = 5;

    useEffect(() => {
        getTodos()
            .then(setTodos)
            .catch((err: ProblemDetails) => {
                console.error(err);
                setError(err.detail || "An unexpected error occurred");
            });
    }, []);

    const handleAdd = async (title: string) => {
        try {
            const newTodo = await createTodo({ title, isCompleted: false } as CreateTodoRequest);
            setTodos(prev => [...prev, newTodo]);
            toast.success("Todo added successfully!");
        } catch (err: unknown) {
            const problem = err as ProblemDetails;
            const message =
                problem.errors?.map(e => e.description).join(", ") ||
                problem.detail ||
                "Unexpected error";
            toast.error(message);
        }
    };

    const handleToggle = async (todo: TodoItem) => {
        try {
            const updated = await updateTodo(todo.id, {
                title: todo.title,
                isCompleted: !todo.isCompleted,
            });
            setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
            toast.info("Todo updated!");
        } catch (err: unknown) {
            const problem = err as ProblemDetails;
            toast.error(problem.detail || "Unexpected error");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(prev => prev.filter(t => t.id !== id));
            toast.success("Todo deleted!");
        } catch (err: unknown) {
            const problem = err as ProblemDetails;
            toast.error(problem.detail || "Unexpected error");
        }
    };

    const handleEdit = async (id: number, newTitle: string) => {
        try {
            const updated = await updateTodo(id, { title: newTitle, isCompleted: todos.find(t => t.id === id)?.isCompleted || false });
            setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
            toast.info("Todo edited!");
        } catch (err: unknown) {
            const problem = err as ProblemDetails;
            toast.error(problem.detail || "Unexpected error");
        }
    };

    // Pagination logic
    const filteredTodos = todos.filter(todo => {
        if (filter === "completed") return todo.isCompleted;
        if (filter === "pending") return !todo.isCompleted;
        return true; // "all"
    });

    const totalPages = Math.ceil(todos.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const visibleTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <Header />
            <Container sx={{ pb: 12, mt: 4 }}>
                {error && <Alert severity="error">{error}</Alert>}

                {/* Filter controls */}
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={(_, value) => {
                        if (value !== null) {
                            setFilter(value);
                            setPage(1); // reset to first page when filter changes
                        }
                    }}
                    sx={{ mb: 2 }}
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="completed">Completed</ToggleButton>
                    <ToggleButton value="pending">Pending</ToggleButton>
                </ToggleButtonGroup>

                <TodoForm onSubmit={handleAdd} />

                <Stack spacing={3} sx={{ mt: 3 }}>
                    <TodoList
                        todos={visibleTodos}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                    />
                    {totalPages > 1 && (
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: 2,
                                "& .MuiPaginationItem-root": { color: "#fff" },
                            }}
                        />
                    )}
                </Stack>

                <Footer />
            </Container>
        </>
    );
};
