const todolists = [{
  id: 1,
  name: 'Project 1',
}, {
  id: 2,
  name: 'Project 2',
}];

export const resolvers = {
  Query: {
    todolists: () => {
      return todolists;
    },
  },
};
