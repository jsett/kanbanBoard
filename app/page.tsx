import Image from "next/image";
import MainApp, { BoardData } from "./component/main/app";
import {MainApp2} from "./component/main/app";

import prisma from "@/lib/db";

export default async function Home() {
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

  if(board){
    board.states = board.states ? JSON.parse(board?.states) : [];
  }

  return (
    <>
    {/* {JSON.stringify(users)} */}
    {/* {JSON.stringify(board.states)} */}
    {/* <MainApp board={board} users={users} /> */}
    <MainApp2 board={board} users={users} />
    </>
  );
}
