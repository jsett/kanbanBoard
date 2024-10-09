import { createSchema, createYoga } from 'graphql-yoga'
 
const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
      }
    `,
    resolvers: {
      Query: {
        greetings: () => 'This is the `greetings` field of the root `Query` type'
      }
    }
  }),
 
  graphqlEndpoint: '/api/graphql',
 
  fetchAPI: { Response }
})
 
export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }