import { MainApp } from "@/app/component/main/app";

import prisma from "@/lib/db";

export default async function HomeByID({ params }: { params: { id: string } }) {
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
  let board = await prisma.board.findFirst({
    where: {
      id: parseInt(params.id)
    },
    include: {
      tasks: {
        include: {
          user: true,
          tagslist: {
            include: {
              tag: true
            }
          }
        }
      }
    }
  })

  if (board) {
    board.states = board.states ? JSON.parse(board?.states) : [];
  }

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
