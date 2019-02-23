import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";
import DashboardAdmin from "./pages/DashboardAdmin";

if (localStorage.getItem("@ExpressReactAuthToken")) {
  setAuthToken(localStorage.getItem("@ExpressReactAuthToken"));
  const decoded = jwt_decode(localStorage.getItem("@ExpressReactAuthToken"));
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute
              allowed={["user", "admin"]}
              path="/"
              exact
              component={Dashboard}
            />
            <PrivateRoute
              allowed={["admin"]}
              path="/admin"
              exact
              component={DashboardAdmin}
            />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
