import React from 'react';
import {
  gql,
  graphql
} from 'react-apollo';

import {
  Link
} from 'react-router-dom'

import AddTodoList from './AddTodoList';

const TodoList = ({ data: {loading, error, todolists }}) => {

  if(loading){
    return (<p>Loading...</p>);
  }

  if(error){
    return (<p>{error.message}</p>);
  }

  return (
    <div className="todoList">
      <AddTodoList />

        { todolists.map(list => <div key={list.id} className={'todos '+
          (list.id < 0 ? 'optimistic' : '')}>
          <Link to={`todoList/${list.id}`}>{list.name}</Link>
        </div>) }

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
