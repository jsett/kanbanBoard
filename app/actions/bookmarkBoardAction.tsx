'use server'
import prisma from "@/lib/db"; 
import { revalidatePath } from "next/cache";

export async function bookmarkBoardAction(formData) {
    let boardID: string | null | undefined = formData.get("boardId")?.toString();
    let userID: string | null | undefined = formData.get("userId")?.toString();

    try {
        const bookmarkRef = await prisma.bookmark.findFirst({
            where:{
                boardId: Number(boardID),
                userId: Number(userID)
            }
        })
        if (bookmarkRef){
            const delres = await prisma.bookmark.delete({
                where: {
                    id: bookmarkRef.id
                }
            })
        } else {
            const createRes = await prisma.bookmark.create({
                data: {
                    board: {
                        connect: {
                            id: Number(boardID)
                        }
                    },
                    user: {
                        connect: {
                            id: Number(userID)
                        }
                    }
                },
              })
        }
    } catch (error) {
        console.log("error updating bookmark")
        console.error(error);
    }    

    revalidatePath(`/board/${boardID}`);
}