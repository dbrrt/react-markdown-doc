/* @flow */
import React, { PureComponent, Fragment } from "react";
import PropTypes from 'prop-types'
import ReactDOM from "react-dom";

// Router
import { Router, Switch, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'

type Props = {};
type State = {};

import { Button } from './Button'

class Hello extends PureComponent<Props, State> {
  render = () => (
    <Fragment>
      Hello there
      <br />
      <Button />
      <br />
      <Link to='/b'>Go to B</Link>
    </Fragment>
  )
}

class Route2 extends PureComponent<Props, State> {
  render = () => (
    <Fragment>
      Route 2
      <Link to='/'>Go to Home</Link>
    </Fragment>
  )
}

class NoMatch extends PureComponent<Props, State> {
  render = () => <Fragment>404: Not Found</Fragment>
}

const history = createBrowserHistory()

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact name='route1' path='/' component={Hello} />
        <Route exact name='route2' path='/b' component={Route2} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  );
};

export { App }
