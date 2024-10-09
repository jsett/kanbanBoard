'use client';
import { ApolloClient, useQuery, useSubscription, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import {
    ApolloLink,
    Operation,
    FetchResult,
    Observable,
  } from '@apollo/client/core';
  import { print, GraphQLError } from 'graphql';
  import { createClient, ClientOptions, Client } from 'graphql-sse';
   
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



export default function MainApp(){
    return <>
        <ApolloProvider client={client}>
            <h1>hello world mainApp1</h1>
            <DisplayGreeting />
            <DisplayCounter />
        </ApolloProvider>
    </>
}