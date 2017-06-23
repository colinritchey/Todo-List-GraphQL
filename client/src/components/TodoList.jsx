import React from 'react';
import {
  gql,
  graphql
} from 'react-apollo';

import AddTodoList from './AddTodoList';

const TodoList = ({ data: {loading, error, todolists }}) => {

  if(loading){
    return (<p>Loading...</p>);
  }

  if(error){
    return (<p>{error.message}</p>);
  }

  return (
    <div className="channelsList">
      <AddTodoList />
      <ul>
        { todolists.map(list => <li key={list.id} className="channel">{list.name}</li>) }
      </ul>
    </div>
  );
}

export const todosListQuery = gql`
  query TodoListQuery {
    todolists {
      id
      name
    }
  }
`;

export default graphql(todosListQuery)(TodoList);
