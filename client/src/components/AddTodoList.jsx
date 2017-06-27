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
        optimisticResponse: {
         addTodoList: {
           name: e.target.value,
           id: Math.round(Math.random() * -1000000),
           __typename: 'TodoList',
         },
       },
        update: (store, { data: { addTodoList } }) => {
            const data = store.readQuery({query: todosListQuery });

            data.todolists.push(addTodoList);

            store.writeQuery({ query: todosListQuery, data });
          },
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
