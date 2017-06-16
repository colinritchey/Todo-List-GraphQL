import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';

import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';

import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema });

const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const client = new ApolloClient({
  networkInterface: mockNetworkInterface,
});

const TodoList = ({ data: {loading, error, todolists }}) => {
  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>{error.message}</p>
  }

  return (
    <ul>
      { todolists.map(list => <li key={list.id} >{list.name}</li>) }
    </ul>
  );
}

const todosListQuery = gql`
  query TodoListQuery {
    todolists {
      id
      name
    }
  }
`;

const TodoListWithData = graphql(todosListQuery)(TodoList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <TodoListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
