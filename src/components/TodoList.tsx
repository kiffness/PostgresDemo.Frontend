import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    TextField,
    Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion, AnimatePresence } from "framer-motion";
import type {TodoItem} from "../types/todo.ts";

interface TodoListProps {
    todos: TodoItem[]
    onToggle: (todo: TodoItem) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, title: string) => void;
}

export const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");

    const handleStartEdit = (todo: TodoItem) => {
        setEditingId(todo.id);
        setEditTitle(todo.title);
    };

    const handleSave = (id: number) => {
        if (editTitle.trim()) {
            onEdit(id, editTitle.trim());
            setEditingId(null);
        }
    };

    return (
        <Box sx={{ display: "grid", gap: 2, mt: 2 }}>
            <AnimatePresence>
                {todos.map((todo) => (
                    <motion.div
                        key={todo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        layout
                    >
                        <Card
                            variant="outlined"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                p: 1.5,
                                backgroundColor: "background.paper"
                            }}
                        >
                            <CardContent sx={{ flex: 1 }}>
                                {editingId === todo.id ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        onBlur={() => handleSave(todo.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleSave(todo.id);
                                            if (e.key === "Escape") setEditingId(null);
                                        }}
                                        autoFocus
                                    />
                                ) : (
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textDecoration: todo.isCompleted ? "line-through" : "none"
                                        }}
                                    >
                                        {todo.title}
                                    </Typography>
                                )}
                            </CardContent>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, pr: 1 }}>
                                <IconButton onClick={() => onToggle(todo)}>
                                    <CheckCircleIcon color={todo.isCompleted ? "success" : "disabled"} />
                                </IconButton>
                                <IconButton onClick={() => handleStartEdit(todo)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(todo.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </Box>
    );
};
