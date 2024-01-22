import { NextRequest, NextResponse } from "next/server";
import { fetchTodos, addATodo } from "@/data/firestore"

// Get all tasks
export async function GET(request: NextRequest) {
    const fetchedTodos = await fetchTodos();
    const response = {
        message: 'Successfully retrieved all tasks',
        type: "Single",
        data: fetchedTodos
    }
    return NextResponse.json(response, {status: 200});
}

// Add a task
export async function POST(request: NextRequest) { 
    const { name } = await request.json();
    
    if (!name) { 
        const errMessage = {
            message: "Task name not provided, please provide a name of task todo"
        }
        return Response.json(errMessage, {status: 422});
    }
    const addedTodo = await addATodo(name);
    const response = {
        message: "Successfully added a new task",
        type: "Single",
        data: addedTodo,
    }
    return Response.json(response, {status: 200});
}
