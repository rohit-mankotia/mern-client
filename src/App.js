import React from "react";
import "toastr/build/toastr.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import India from "./components/India";
import World from "./components/World";
import Business from "./components/Business";
import Sports from "./components/Sports";
import CreateBlog from "./components/CreateBlog";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <NavBar token={token} />
        <Switch>
          <Route exact component={SignIn} path="/signin" />
          <Route exact component={SignUp} path="/signup" />
          <Route component={Home} exact path="/" />
          <Route component={India} path="/india" />
          <Route component={World} path="/world" />
          <Route component={Business} path="/business" />
          <Route component={Sports} path="/sports" />
          <PrivateRoute
            component={CreateBlog}
            path="/create-blog"
            token={token}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
