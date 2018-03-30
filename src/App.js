import React, { PureComponent, Fragment } from "react";
import PropTypes from 'prop-types'
import ReactDOM from "react-dom";

// Router
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

class Hello extends PureComponent {
  render = () => <Fragment>Hello</Fragment>
}

class Route2 extends PureComponent {
  render = () => <Fragment>Route2</Fragment>
}


const history = createBrowserHistory()

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact name='route1' path='/' component={Hello} />
        <Route exact name='route2' path='/a' component={Route2} />
      </Switch>
    </Router>
  );
};

export { App }
