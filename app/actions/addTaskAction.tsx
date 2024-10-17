'use server'
import prisma from "@/lib/db"; 
import { revalidatePath } from "next/cache";

export async function addTaskAction(formData) {
    let state: string | null | undefined = formData.get("state")?.toString();
    let boardID: string | null | undefined = formData.get("board")?.toString();
    let text: string | null | undefined = formData.get("text")?.toString();
    let assignedUser: string | null | undefined = formData.get("assignedUser")?.toString();

    console.log(`state: ${state} boardID: ${boardID} text: ${text} assignedUser: ${assignedUser}`)

    if (state && boardID && assignedUser) {

        const result = await prisma.tasks.create({
            data: {
                state: state,
                dueDate: "-",
                text: text,
                board: {
                    connect: {
                        id: parseInt(boardID)
                    }
                },
                user: {
                    connect: {
                        id: parseInt(assignedUser)
                    }
                }
            }
        })
    }


    revalidatePath(`/board/${boardID}`);
}