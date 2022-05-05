import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { FiltersProvider } from './providers/FiltersStateProvider';
import { SortProvider } from './providers/SortStateProvider';
import { BadgesProvider } from './providers/BadgesStateProvider';
import { StoreProvider } from './state/store/provider';

import Home from './pages/Home';
import Login from './pages/Login';
import SingleItem from './pages/SingleItem';
import Register from './pages/Register';
import AllItems from './pages/AllItems';
import Page404 from './pages/Page404';
import Brand from './pages/Brand';
import LookFeed from './pages/LookFeed';
import SingleLook from './pages/SingleLook';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import WishList from './pages/WishList';
import Navbar from './components/Navbar';
import Lock from './components/Lock';
import MyOrders from './pages/MyOrders';

import ErrorBoundary from './components/ErrorBoundary';
import Auth from './utils/auth';

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
  console.log(Auth.isBrand(), 'App.js');
  return (
    <ApolloProvider client={client}>
      <FiltersProvider>
        <StoreProvider>
          <SortProvider>
            <BadgesProvider>
              <Router>
                <ErrorBoundary>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/items" element={<AllItems />} />
                    <Route path="/item/:itemId" element={<SingleItem />} />
                    <Route exact path="/success" element={<Success />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wardrobe/lists/owned" element={<MyOrders />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/wardrobe/lists/liked" element={<WishList />} />
                    <Route path="/lookfeed" element={<LookFeed />} />
                    <Route path="/look/:lookId" element={<SingleLook />} />
                    <Route path="/dashboard" element={<Lock />}>
                      <Route index element={<Brand />} />
                    </Route>
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    <Route path="*" element={<Page404 />} />
                  </Routes>
                </ErrorBoundary>
              </Router>
            </BadgesProvider>
          </SortProvider>
        </StoreProvider>
      </FiltersProvider>
    </ApolloProvider>
  );
}

export default App;
