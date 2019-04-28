import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from "react-apollo";

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://127.0.0.1:8000/?' }),
  cache,
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <main>
            {/* <Route {} render={props => (
                    localStorage.getItem('user')
                        ? <Component {...props} />
                        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )} /> */}
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
            </main>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
