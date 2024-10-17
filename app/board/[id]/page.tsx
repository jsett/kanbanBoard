import MainApp from "@/app/component/main/app";

import prisma from "@/lib/db";

export default async function HomeByID({params}:{params: { id: string }}) {
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
  const board = await prisma.board.findFirst({
    where: {
        id: parseInt(params.id)
    },
    include: {
      tasks: {
        include: {
          user: true
        }
      }
    }
  })

    if (board == null) {
        return <><h1>Unable to find board by id {params.id}</h1></>
    } else {
        return (
            <>
                <MainApp board={board} users={users} />
            </>
        );
    }

}
