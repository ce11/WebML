import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import ClassicML from './ClassicML'
import 'typeface-roboto';

import NN from './NN'
const Home = () => (
  <div>
    <ul>
      <li>
        <Link to="/classic">Classic Machine Learning</Link>
      </li>
      <li>
        <Link to="/nn">Neural Nets</Link>
      </li>
    </ul>
    <hr />
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/classic" component={ClassicML} />
          <Route path="/nn" component={NN} />
        </div>
      </Router>
    );
  }
}

export default App;
