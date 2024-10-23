
import prisma from "@/lib/db";


export async function POST(request: Request) {
    const formData = await request.formData()

    let taskId = formData.get("taskId");
    let state = formData.get("state");
    let text = formData.get("text");
    let assignedUser = formData.get("assignedUser");
    let boardId = formData.get("boardId");

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
        
    } catch (error) {
        console.log("error Editing Task API")
        console.error(error);
        return Response.json({ error: "something when wrong in creating the task" })
    }    
  }