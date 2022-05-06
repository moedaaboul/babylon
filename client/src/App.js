import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { FiltersProvider } from './providers/FiltersStateProvider';
import { SortProvider } from './providers/SortStateProvider';
import { BadgesProvider } from './providers/BadgesStateProvider';
import { StoreProvider } from './state/store/provider';
import { DrawerProvider } from './providers/DrawerStateProvider';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Home from './pages/Home';
import Login from './pages/Login';
import SingleItem from './pages/SingleItem';
import Register from './pages/Register';
import AllItems from './pages/AllItems';
import Page404 from './pages/Page404';
import Brand from './pages/Brand';
import LookFeed from './pages/LookFeed';
import SingleLook from './pages/SingleLook';
import Summary from './pages/Summary';
import Success from './pages/Success';
import WishList from './pages/WishList';
import Navbar from './components/Navbar';
import Lock from './components/Lock';
import LockGeneral from './components/LockGeneral';
import MyOrders from './pages/MyOrders';

import ErrorBoundary from './components/ErrorBoundary';
import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#000000',
      light: '#000000',
    },
    secondary: {
      main: '#098c47',
    },
  },
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
              <DrawerProvider>
                <Router>
                  <ErrorBoundary>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/items" element={<LockGeneral />}>
                        <Route index element={<AllItems />} />
                      </Route>
                      <Route path="/item/:itemId" element={<LockGeneral />}>
                        <Route index element={<SingleItem />} />
                      </Route>
                      <Route path="/success" element={<LockGeneral />}>
                        <Route index element={<Success />} />
                      </Route>
                      <Route path="/checkout" element={<LockGeneral />}>
                        <Route index element={<Summary />} />
                      </Route>
                      <Route path="/wardrobe/lists/owned" element={<LockGeneral />}>
                        <Route index element={<MyOrders />} />
                      </Route>
                      <Route path="/wardrobe/lists/liked" element={<LockGeneral />}>
                        <Route index element={<WishList />} />
                      </Route>
                      <Route path="/look/:lookId" element={<LockGeneral />}>
                        <Route index element={<SingleLook />} />
                      </Route>
                      <Route path="/lookfeed" element={<LockGeneral />}>
                        <Route index element={<LookFeed />} />
                      </Route>
                      <Route path="/dashboard" element={<Lock />}>
                        <Route index element={<Brand />} />
                      </Route>
                      <Route path="*" element={<Page404 />} />
                    </Routes>
                  </ErrorBoundary>
                </Router>
              </DrawerProvider>
            </BadgesProvider>
          </SortProvider>
        </StoreProvider>
      </FiltersProvider>
    </ApolloProvider>
  );
}

export default App;
