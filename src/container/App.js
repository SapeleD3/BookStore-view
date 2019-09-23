import React from 'react';
import './App.css';
import Home from '../component/Home/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route to='/' component={Home} />
    </Router>
  );
}

export default App;
