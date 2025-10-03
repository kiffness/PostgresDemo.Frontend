import {Checkbox, IconButton, List, ListItem, ListItemText} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import type {TodoItem} from "../types/todo.ts";

interface TodoListProps {
    todos: TodoItem[];
    onDelete: (id: number) => void;
    onToggle: (todo: TodoItem) => void;
}

export const TodoList = ({ todos, onDelete, onToggle }: TodoListProps) => (
    <List>
        {todos.map(todo => (
            <ListItem key={todo.id} secondaryAction={
                <IconButton edge="end" onClick={() => onDelete(todo.id)}>
                    <DeleteIcon />
                </IconButton>
            }>
                <Checkbox checked={todo.isCompleted} onChange={() => onToggle(todo)} />
                <ListItemText primary={todo.title} />
            </ListItem>
        ))}
    </List>
);