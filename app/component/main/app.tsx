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
import { boardState } from './state/atoms';
import { Board } from '@prisma/client';
import SideBar from './sidebar';
import NavBar from './navbar';
   
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



export default function MainApp({ board }: {board: Board }){
    return <>
        <ApolloProvider client={client}>
            <RecoilRoot>
              <NavBar />
              <div className="flex flex-row">
                <SideBar>
                  <Kanban board={board}/>
                </SideBar>
              </div>
            </RecoilRoot>
        </ApolloProvider>
    </>
}