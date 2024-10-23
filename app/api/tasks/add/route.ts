
import prisma from "@/lib/db";


export async function POST(request: Request) {
    const formData = await request.formData()

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
            },
            include: {
                user: true,
                tagslist: {
                    include: {
                        tag: true
                    }
                }
            }
        })
        return Response.json(result)
    }
    return Response.json({ error: "something when wrong in creating the task" })
    
  }