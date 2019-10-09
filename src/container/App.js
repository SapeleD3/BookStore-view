import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify'
import Home from '../component/Home/Home'
import Dashboard from '../component/dashboard/Dashboard'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import NotFound from './NotFound';
import history from '../component/history'

import Nav from '../component/Navigation'



class App extends React.Component {
  state = {
    isLoggedIn: false
  }

  componentDidMount() {
    const token = localStorage.getItem("JWT_TOKEN")
    if (token) {
      this.setState({ isLoggedIn: true })
    }
  }

  render() {
    const token = localStorage.getItem("JWT_TOKEN")
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest}
        render={(props) => (
          token ? <Component {...props} /> :
            <Redirect to='/' />
        )
        }
      />
    );
    return (
      <React.Fragment>
        <Router history={history}>
        <Nav />
          <div>
            <Switch>
              <Route path='/' exact component={Home} />
              <PrivateRoute path='/dashboard' exact component={Dashboard} />
              <ToastContainer />
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
