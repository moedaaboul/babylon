import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SingleProduct from './pages/SingleProduct';
import Register from './pages/Register';
import AllItems from './pages/AllItems';
import Dashboard from './pages/Dashboard';
import Brand from './pages/Brand';

import ErrorBoundary from './components/ErrorBoundary';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ErrorBoundary>
          <Home />
          <Routes>
            <Route path="/" element={<h2>home page</h2>} />
            <Route path="/login" element={<Login />} />
            <Route path="/items" element={<AllItems />} />
            <Route path="/SingleProduct" element={<SingleProduct />} />
            <Route path="/register" element={<Register />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<h1 className="">Wrong page!</h1>} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </ApolloProvider>
  );
}

export default App;
