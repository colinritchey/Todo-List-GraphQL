import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import TodoListWithData from './components/TodoList';
import TodoListDetail from './components/TodoListDetail';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to Apollo</h2>
            </div>
            <Link to="/" className="navbar">React + GraphQL Tutorial</Link>
            <Switch>
              <Route exact path="/" component={TodoListWithData}/>
              <Route path="/todoList/:todoListId" component={TodoListDetail}/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
