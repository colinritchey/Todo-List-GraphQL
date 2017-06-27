import React from 'react';
import {
  gql,
  graphql
} from 'react-apollo';

import { todoListDetailsQuery } from './TodoListDetail';

const AddTodo = ({ mutate, match }) => {
  const handleKeyPress = (e) => {
    if (e.keyCode === 13){
      e.persist();
      mutate({
        variables: {
          message: {
            todoListId: match.params.todoListId,
            text: e.target.value
          }
        },
        optimisticResponse: {
         addTodo: {
           name: e.target.value,
           id: Math.round(Math.random() * -1000000),
           __typename: 'Todo',
         },
       },

       update: (store, { data: { addTodo } }) => {
         const data = store.readQuery({
           query: todoListDetailsQuery,
           variables: {
             todoListId: match.params.todoListId,
           }
         });
         data.todoList.messages.push(addTodo);
         store.writeQuery({
           query: todoListDetailsQuery,
           variables: {
             todoListId: match.params.todoListId,
           },
           data
         });
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
      placeholder="New Todo Item"
      onKeyUp={ handleKeyPress }
      ></input>
  )
}

const addTodoMutation = gql`
  mutation addTodo($text: TodoInput!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`;


const AddTodoWithMutation = graphql(
  addTodoMutation
)(AddTodo);

export default AddTodoWithMutation;
