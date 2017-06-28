import React from 'react';
import {
  gql,
  graphql
} from 'react-apollo';

import { todoListDetailsQuery } from './TodoListDetail';
import { withRouter } from 'react-router';

const AddTodo = ({ mutate, match }) => {
  const handleKeyPress = (e) => {
    if (e.keyCode === 13){
      e.persist();
      mutate({
        variables: {
          todo: {
            todolistId: match.params.todoListId,
            text: e.target.value
          }
        },
        optimisticResponse: {
         addTodo: {
           text: e.target.value,
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
         data.todolist.todos.push(addTodo);
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
  mutation addTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      id
      text
    }
  }
`;


const AddTodoWithMutation = graphql(
  addTodoMutation
)(withRouter(AddTodo));

export default AddTodoWithMutation;
