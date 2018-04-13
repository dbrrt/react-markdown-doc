/* @flow */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

// Router
import { Router, Switch, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Home } from './Home'
import { NotFound } from './NotFound'
import { JupyExample } from './JupyExample'

type Props = {};
type State = {};

const history = createBrowserHistory()

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact name='route1' path='/' component={Home} />
        <Route exact name='jupyter' path='/jup' component={JupyExample} />
        <Route path='*' component={NotFound}/>
      </Switch>
    </Router>
  );
};

export { App }
