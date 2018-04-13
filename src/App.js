/* @flow */
import React, { PureComponent, Fragment } from "react";
import PropTypes from 'prop-types'
import ReactDOM from "react-dom";

// Router
import { Router, Switch, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Home } from './Home'

type Props = {};
type State = {};

class NoMatch extends PureComponent<Props, State> {
  render = () => <Fragment>404: Not Found</Fragment>
}

const history = createBrowserHistory()

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact name='route1' path='/' component={Home} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  );
};

export { App }
