'use client';
import React from 'react';
import Kanban from './kanban';
import { Board, User } from '@prisma/client';
import SideBar from './sidebar';
import NavBar from './navbar';

import { MyProviders } from '../providers';
   
export type UserData = {
  id: number,
  name: string,
  email: string,
  image: string,
}

export type TagData = {
  id: number,
  name: string
}

export type TagsListData = {
  id: number,
  taskId: number,
  tagId: number,
  tag: TagData
}

export type TaskData = {
  id: number,
  state: string,
  dueData: string,
  text: string,
  boardId: number,
  userId: number,
  user: UserData,
  tagslist: TagsListData[]
}

export type BoardData = {
  id: number,
  boardName: string,
  states: string[],
  userId: number,
  tasks: TaskData[],

}

export function MainApp({ board, users }: { board: BoardData, users: User[] }) {
  return <>
    <MyProviders>
      <NavBar users={users} />
      <SideBar users={users}>
        <Kanban board={board} />
      </SideBar>
    </MyProviders>
  </>
}