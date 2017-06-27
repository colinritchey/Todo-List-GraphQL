import React from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

import Todos from './Todos';

export const todoListDetailsQuery = gql`
  query TodoListDetailsQuery($todoListId : ID!) {
    todolist(id: $todoListId) {
      id
      name
      todos {
        id
        text
      }
    }
  }
`;

const TodoListDetails = ({ data: {loading, error, todolist }, match }) => {
  console.log(error);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <div className="todoList">
        {todolist.name}
      </div>
      <Todos todos={todolist.todos}/>
    </div>
  );
}


export default (graphql(todoListDetailsQuery, {
  options: (props) => ({
    variables: { todoListId: props.match.params.todoListId },
  }),
})(TodoListDetails));
