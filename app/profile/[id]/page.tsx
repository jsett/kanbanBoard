import prisma from "@/lib/db"
import ProfileApp from "@/app/component/profile/profileApp"

export default async function ProfilePage({params}:{params: { id: string }}){
    const users = await prisma.user.findMany({
        include: {
          bookmark: {
            include: {
              board: true
            }
          },
          boards: true
        }
      })

    const user = await prisma.user.findFirst({
        where: { id: parseInt(params.id) },
        include: {
          bookmark: {
            include: {
              board: true
            }
          },
          boards: true
        }
      })

    return <div>
        <ProfileApp user={user} users={users} />
    </div>
}