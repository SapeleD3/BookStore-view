import React from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import Home from "../component/Home/Home";
import Dashboard from "../component/dashboard/Dashboard";
import { Router, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import history from "../component/history";

import Nav from "../component/Navigation";
import { Provider } from "react-redux";
import store from "../Redux/store";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { logoutUser, getUser } from "../Redux/actions/userAction";
import { SET_AUTHENTICATED } from "../Redux/types";
import CheckAuth from "../component/HOC/CheckAuth";

class App extends React.Component {
  render() {
    const token = localStorage.JWT_TOKEN;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log("1", new Date(decodedToken.exp * 1000));
        console.log("2", decodedToken.exp * 1000 < Date.now());
        store.dispatch(logoutUser);
        history.push("/");
      } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUser());
      }
    }
    return (
      <Provider store={store}>
        <React.Fragment>
          <Router history={history}>
            <Nav />
            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <CheckAuth path="/dashboard" exact component={Dashboard} />
                <ToastContainer />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
