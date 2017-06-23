import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';

import { resolvers } from './resolver';

const typeDefs = `
  type TodoList {
    id: ID!
    name: String
  }

  type Query {
    todolists: [TodoList]
  }

  type Mutation {
    addTodoList(name: String!): TodoList
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
