import { createSchema, createYoga } from 'graphql-yoga'
import { setTimeout as setTimeout$ } from 'node:timers/promises'
 
const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
      }

      type Subscription {
        countdown(from: Int!): Int!
      }
    `,
    resolvers: {
      Query: {
        greetings: () => 'This is the `greetings` field of the root `Query` type'
      },
      Subscription: {
        countdown: {
          // This will return the value on every 1 sec until it reaches 0
          subscribe: async function* (_, { from }) {
            for (let i = from; i >= 0; i--) {
              await setTimeout$(1000)
              yield { countdown: i }
            }
          }
        }
      }
    }
  }),
 
  graphqlEndpoint: '/api/graphql',
 
  fetchAPI: { Response }
})
 
export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }