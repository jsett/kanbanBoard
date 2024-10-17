'use server'
import prisma from "@/lib/db"; 
import { revalidatePath } from "next/cache";

export async function EditTaskAction(formData) {
    let taskId = formData.get("taskId");
    let state = formData.get("state");
    let text = formData.get("text");
    let assignedUser = formData.get("assignedUser");
    let boardId = formData.get("boardId");

    console.log(`id: ${taskId} state: ${state} boardID: ${boardId} text: ${text} assignedUser: ${assignedUser}`)

    try {
        const result = await prisma.tasks.update({
            where: {
                id: parseInt(taskId)
            },
            data: {
                state: state,
                dueDate: "-",
                text: text,
                user: {
                    connect: {
                        id: parseInt(assignedUser)
                    }
                }
            }
        })
        
    } catch (error) {
        revalidatePath(`/board/${boardId}`);
        console.log("error Editing Task action")
        console.error(error);
    }    
}