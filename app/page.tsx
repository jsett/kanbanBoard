import Image from "next/image";
import MainApp from "./component/main/app";

import prisma from "@/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany()

  return (
    <>
    {JSON.stringify(users)}
    <MainApp />
    </>
  );
}
