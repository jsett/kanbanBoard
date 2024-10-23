import prisma from "@/lib/db";

export async function POST(request: Request) {
    const formData = await request.formData()

    
    let searchString = formData.get("searchString");

    try {
        const result = await prisma.user.findMany({
            where: {
              OR: [
                { name: { contains: searchString } },
                { email: { contains: searchString } },
              ]
            },
            take: 6
          })

        return Response.json(result)
        
    } catch (error) {
        console.log("error searching user API")
        console.error(error);
        return Response.json({ error: "something when wrong in searching for user" })
    }  
    
  }