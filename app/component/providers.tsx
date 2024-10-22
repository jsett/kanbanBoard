'use client';
import { ApolloClient, useQuery, useSubscription, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { Provider } from 'jotai'

import React from 'react';

import {
    ApolloLink,
    Operation,
    FetchResult,
    Observable,
  } from '@apollo/client/core';
  import { print, GraphQLError } from 'graphql';
  import { createClient, ClientOptions, Client } from 'graphql-sse';
import ThemeComponent from './main/theme';
   
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



export function MyProviders({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <ApolloProvider client={client}>
        <Provider>
            <ThemeComponent>
                {children}
            </ThemeComponent>
        </Provider>
    </ApolloProvider>
  )
}