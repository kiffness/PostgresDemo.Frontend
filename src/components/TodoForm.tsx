import {useState} from "react";
import * as React from "react";
import {Button, TextField} from "@mui/material";

interface TodoFormProps {
    onSubmit: (title: string) => void;
}

export const TodoForm =({ onSubmit }: TodoFormProps) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(title);
        setTitle('');
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
            <TextField
                label="New Todo"
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
            />
            <Button type="submit" variant="contained">Add</Button>
        </form>
    );
}