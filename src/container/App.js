import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify'
import Home from '../component/Home/Home'
import Dashboard from '../component/dashboard/Dashboard'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navigation from '../component/Navigation';
import NotFound from './NotFound';
import queryString from 'query-string'

class App extends React.Component {

  // componentWillMount() {
  //   const query = queryString.parse(location.search);
  //   if (query.token) {
  //     window.localStorage.setItem('token', query.token);
  //     this.props.history.push('/dashboard')
  //   }
  // }
  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <Switch>
              <Route path='/' exact component={Home} />
              <Navigation>
                <Route path='/dashboard' exact component={Dashboard} />
              </Navigation>
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
