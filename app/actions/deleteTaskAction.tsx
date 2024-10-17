'use server'
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteTaskAction(formData) {
    let taskID: string | null | undefined = formData.get("id")?.toString();
    let boardID: string | null | undefined = formData.get("boardID")?.toString();

    console.log(`delete taskID: ${taskID}`);
    if (taskID) {
        const deleteTagsList = await prisma.tagsList.deleteMany({
            where: {
                tasksId: parseInt(taskID),
            },
        })
        const deleteComments = await prisma.comments.deleteMany({
            where: {
                tasksId: parseInt(taskID),
            },
        })
        const deleteTask = await prisma.tasks.delete({
            where: {
                id: parseInt(taskID),
            },
        })
    }

    revalidatePath(`/board/${boardID}`);
}