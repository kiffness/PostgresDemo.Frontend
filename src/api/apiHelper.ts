import type {ProblemDetails} from "../types/todo.ts";

export async function handleApiResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
        return res.json();
    }

    const problem: ProblemDetails = await res.json();
    throw problem;
}