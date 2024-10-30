'use server'
import prisma from "@/lib/db"; 
import { revalidatePath } from "next/cache";

export async function updateBoardNameAction(formData) {
    let boardID: string | null | undefined = formData.get("boardId")?.toString();
    let boardName: string | null | undefined = formData.get("boardName")?.toString();

    try {
        const result = await prisma.board.update({
            where: {
                id: parseInt(boardID)
            },
            data: {
                boardName: boardName
            }
        })
        
    } catch (error) {
        console.log("error board name")
        console.error(error);
    }    

    revalidatePath(`/board/${boardID}`);
}