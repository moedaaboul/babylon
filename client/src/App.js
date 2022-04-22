import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AllItems from "./pages/AllItems";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/items" element={<AllItems />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<h1 className="">Wrong page!</h1>} />
            </Routes>
          </>
        </ErrorBoundary>
      </Router>
    </ApolloProvider>
  );
}

export default App;
