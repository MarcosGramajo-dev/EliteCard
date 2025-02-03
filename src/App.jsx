import './App.css'
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";


import { useAuth0 } from "@auth0/auth0-react";

// FontAwesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

function App() {
  const { isLoading, error } = useAuth0();

  // console.log("isLoading:", isLoading);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className='relative min-h-screen'>
        <div className='py-2 px-4 fixed z-50 w-full'>
          <NavBar />
        </div>
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/dashboard" component={Dashboard} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
