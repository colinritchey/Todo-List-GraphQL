export const typeDefs = `
  type TodoList {
    id: ID!
    name: String
  }

  type Query {
    todolists: [TodoList]
  }
`;
