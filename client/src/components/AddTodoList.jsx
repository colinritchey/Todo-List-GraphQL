import React from 'react';
import {
  gql,
  graphql
} from 'react-apollo';

import { todosListQuery } from './TodoList';

const AddTodoList = ({ mutate }) => {
  const handleKeyPress = (e) => {
    if (e.keyCode === 13){
      e.persist();
      mutate({
        variables: { name: e.target.value },
        refetchQueries: [ { query: todosListQuery }]
      })
      .then( res => {
        e.target.value = '';
      })
    }
  }

  return (
    <input
      type="text"
      placeholder="New Todo List"
      onKeyUp={ handleKeyPress }
      ></input>
  )
}

const addTodoListMutation = gql`
  mutation addTodoList($name: String!) {
    addTodoList(name: $name) {
      id
      name
    }
  }
`;


const AddTodoListWithMutation = graphql(
  addTodoListMutation
)(AddTodoList);

export default AddTodoListWithMutation;
