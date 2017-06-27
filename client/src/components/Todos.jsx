import React from 'react';

import AddTodo from './AddTodo';

const Todos = ({ todos }) => {
  return (
    <div className="messagesList">
      { todos.map( todo =>
        (<div key={todo.id} className={'todos ' + (todo.id < 0 ? 'optimistic' : '')}>
            {todo.text}
        </div>)
      )}
      <AddTodo />
    </div>
  );
};
export default (Todos);
