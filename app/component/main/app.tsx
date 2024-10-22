'use client';
import { ApolloClient, useQuery, useSubscription, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


import {
    ApolloLink,
    Operation,
    FetchResult,
    Observable,
  } from '@apollo/client/core';
  import { print, GraphQLError } from 'graphql';
  import { createClient, ClientOptions, Client } from 'graphql-sse';
import Kanban from './kanban';
import { boardState, themeState } from './state/atoms';
import { Board, User } from '@prisma/client';
import SideBar from './sidebar';
import NavBar from './navbar';
import ThemeComponent from './theme';
import { MyProviders } from '../providers';
import { useHydrateAtoms } from 'jotai/utils';
import { boardAtom } from '@/store/data';
   
  class SSELink extends ApolloLink {
    private client: Client;
   
    constructor(options: ClientOptions) {
      super();
      this.client = createClient(options);
    }
   
    public request(operation: Operation): Observable<FetchResult> {
      return new Observable((sink) => {
        return this.client.subscribe<FetchResult>(
          { ...operation, query: print(operation.query) },
          {
            next: sink.next.bind(sink),
            complete: sink.complete.bind(sink),
            error: sink.error.bind(sink),
          },
        );
      });
    }
  }
   
  export const link = new SSELink({
    url: '/api/graphql'
  });


const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  const GET_GREETING = gql`
  query greeting{
    greetings
  }
`;

function DisplayGreeting() {
    const { loading, error, data } = useQuery(GET_GREETING);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    return <>
        {JSON.stringify(data)};
    </>
  }


const GET_COUNTER = gql`
subscription counter($from: Int!){
  countdown(from: $from)
}
`;



function DisplayCounter() {
  const { data, loading } = useSubscription(GET_COUNTER, {
      variables: {
          from: 100,
      },
  });

  if (!loading) {
      return <>{JSON.stringify(data)}</>
  } else {
      return <div>loading counter</div>
  }
}



export default function MainApp({ board, users }: {board: Board, users: User[] }){
    
    return <>
        <ApolloProvider client={client}>
            <RecoilRoot>
              {/* <ThemeComponent> */}
                <NavBar users={users} />
                <SideBar users={users}>
                  <Kanban board={board}/>
                </SideBar>
              {/* </ThemeComponent> */}
            </RecoilRoot>
        </ApolloProvider>
    </>
}

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

export function MainApp2({ board, users }: { board: BoardData, users: User[] }) {
  return <>
    <MyProviders>
      <NavBar users={users} />
      <SideBar users={users}>
        <Kanban board={board} />
      </SideBar>
    </MyProviders>
  </>
}