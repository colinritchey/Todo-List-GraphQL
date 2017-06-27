import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';

import { resolvers } from './resolver';

const typeDefs = `
  type TodoList {
    id: ID!
    name: String
    todos: [Todo]!
  }

  type Todo {
    id: ID!
    text: String
  }

  input TodoInput{
    todolistId: ID!
    text: String
  }

  type Query {
    todolists: [TodoList]
    todolist(id: ID!): TodoList
  }

  type Mutation {
    addTodoList(name: String!): TodoList
    addTodo(todo: TodoInput!): Todo
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
