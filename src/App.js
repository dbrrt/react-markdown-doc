/* @flow */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

// Router
import { Router, Switch, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { NotFound } from './NotFound'
import { routes } from '~/config'

type Props = {};
type State = {};

const history = createBrowserHistory()

import './theme/base.scss'

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        {routes.map((el: any, i: number) => (
          <Route exact name={i} key={i} path={el.path} component={el.component} />
        ))}
      </Switch>
    </Router>
  );
};

export { App }
