export interface TodoItem {
    id: number;
    title: string;
    isCompleted: boolean;
}

export interface CreateTodoRequest {
    title: string;
    isCompleted: boolean;
}

export interface UpdateTodoRequest {
    title: string;
    isCompleted: boolean;
}

export interface ApiError {
    type: string;
    description: string;
}

export interface ProblemDetails {
    status: number;
    title: string;
    detail: string;
    errors?: ApiError[];
}