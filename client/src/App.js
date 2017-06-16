import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const TodoList = () => {
  return (
    <ul>
      <li>List 1</li>
      <li>List 2</li>
    </ul>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to A TodoList</h2>
        </div>
        <TodoList/>
      </div>
    );
  }
}

export default App;
