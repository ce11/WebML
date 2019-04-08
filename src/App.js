import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import ClassicML from './ClassicML'
import NN from './NN'

import 'typeface-roboto';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme(
  {
    palette: {
      type: 'light',
    },
    primary: blue,
    typography: { useNextVariants: true }
  }
);

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
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/classic" component={ClassicML} />
            <Route path="/nn" component={NN} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
