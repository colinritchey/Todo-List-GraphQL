const todolists = [{
  id: 1,
  name: 'Project 1',
}, {
  id: 2,
  name: 'Project 2',
}];

let newId = 3;

export const resolvers = {
  Query: {
    todolists: () => {
      return todolists;
    },
  },

  Mutation: {
    addTodoList: (root, args) => {
      let newTodoList = { id: newId++, name: args.name };
      todolists.push(newTodoList);
      return newTodoList;
    }
  }
};
