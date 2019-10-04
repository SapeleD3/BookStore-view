import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify'
import Home from '../component/Home/Home'
import Dashboard from '../component/dashboard/Dashboard'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import NotFound from './NotFound';
import history from '../component/history'

import checkAuth from '../component/HOC/checkAuth'


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={(props) => (
      checkAuth.isAuth === true ? <Component {...props} /> :
        <Redirect to='/' />
    )
    }
  />
);

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <div>
            <Switch>
              <Route path='/' exact component={Home} />
              <PrivateRoute path='/dashboard' exact component={Dashboard} />
              <Route component={NotFound} />
              <ToastContainer />

              <Route path='/404' component={NotFound} />
              <Redirect to='/404' />

            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
