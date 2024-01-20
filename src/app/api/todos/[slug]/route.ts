import { NextRequest, NextResponse } from "next/server";

// Get a single task by Id
export async function GET(request: NextRequest, 
    { params }: {params: {slug: string}}) {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get('search');

    const response = {
        message: 'Successfully retrieved single task',
        type: "Single",
        data: {
            id: params.slug,
            name: "Some task",
            isDone: true,  
            query: search
        }
    }
    return NextResponse.json(response, {status: 200});
}

// Edit a single task by id
export async function POST(request: NextRequest,
    { params }: {params: {slug: string}}) {

    const { name, isDone } = await request.json(); 
    const newTodo = { 
        id: params.slug,
        name: name, 
        isDone: isDone, 
    }
    const response = {
        message: "Successfully edited new task",
        type: "Single",
        data: newTodo,
    }
    const data = await request.json()
    return Response.json(response, {status: 200});
}

// Delete a single task by id
export async function DELETE(request: NextRequest,
    { params }: {params: {slug: string}}) {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get('search');

    const response = {
        message: 'Successfully deleted single task',
        type: "Single",
        data: {
            id: params.slug,
            name: "Some task",
            isDone: true,  
            query: search
        }
    }
    return NextResponse.json(response, {status: 200});
}