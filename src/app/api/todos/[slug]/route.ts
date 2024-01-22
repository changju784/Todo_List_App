import { NextRequest, NextResponse } from "next/server";
import { fetchATodo, deleteATodo, updateATodo } from "@/data/firestore";

// Get a single task by Id
export async function GET(request: NextRequest, 
    { params }: {params: {slug: string}}) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('search');
    const fetchedTodo = await fetchATodo(params.slug);
    if (fetchedTodo === null) {
        return new Response(null, { status: 204 })
    }

    const response = {
        message: 'Successfully retrieved a single task',
        type: "Single",
        data: fetchedTodo
    }
    return NextResponse.json(response, {status: 200});
}

// Edit a single task by id
export async function POST(request: NextRequest,
    { params }: {params: {slug: string}}) {

    const { name, isDone } = await request.json(); 
    const updatedTodo = await updateATodo(params.slug, { name, isDone });

     if (updatedTodo === null) {
        return new Response(null, { status: 204 })
    }

    const response = {
        message: "Successfully edited new task",
        type: "Single",
        data: updatedTodo,
    }

    return Response.json(response, {status: 200});
}

// Delete a single task by id
export async function DELETE(request: NextRequest,
    { params }: {params: {slug: string}}) {
    const deletedTodo = await deleteATodo(params.slug);

    if (deletedTodo === null) {
        return new Response(null, { status: 204 })
    }

    const response = {
        message: 'Successfully deleted single task',
        type: "Single",
        data: deletedTodo
    }
    return NextResponse.json(response, {status: 200});
}