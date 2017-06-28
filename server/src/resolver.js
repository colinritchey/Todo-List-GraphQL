const todolists = [{
  id: 1,
  name: 'Project 1',
  todos: [{
    id: 1,
    text: "Pick up dry cleaning"
  }, {
    id: 2,
    text: "say hello world"
  }]
}, {
  id: 2,
  name: 'Project 2',
  todos: [{
    id: 3,
    text: "say good bye"
  }, {
    id: 4,
    text: "say hello world again"
  }]
}];

let newId = 3;
let nextTodoId = 5;

export const resolvers = {
  Query: {
    todolists: () => {
      return todolists;
    },
    todolist: (root, { id }) => {
      return todolists.find(todoList => todoList.id === parseInt(id));
    },
  },

  Mutation: {
    addTodoList: (root, args) => {
      let newTodoList = { id: newId++, name: args.name };
      todolists.push(newTodoList);
      return newTodoList;
    },
    addTodo: (root, { todo }) => {
      const todoList = todolists.find(todoList => todoList.id === parseInt(todo.todolistId));
      if(!todoList)
        throw new Error("TodoList does not exist");
      const newTodo = { id: String(nextTodoId++), text: todo.text };
      todoList.todos.push(newTodo);
      return newTodo;
    },
  }
};
