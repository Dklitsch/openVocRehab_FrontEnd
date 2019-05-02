import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Application from './components/Application'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from "react-apollo";
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/?',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
  cache,
})

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <main>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/application" component={Application} />
            </main>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
