import Image from "next/image";
import MainApp from "./component/main/app";

import prisma from "@/lib/db";

export default async function Home() {
  //const users = await prisma.user.findMany()
  const board = await prisma.board.findFirst({
    include: {
      tasks: {
        include: {
          user: true
        }
      }
    }
  })

  return (
    <>
    {/* {JSON.stringify(users)} */}
    {/* {JSON.stringify(board)} */}
    <MainApp board={board} />
    </>
  );
}
