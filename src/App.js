/* @flow */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Router, Switch, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { routes } from '~/config'
// $FlowFixMe
import './theme/base.scss'
// MainApp
const App = () => (
    <Router history={createBrowserHistory()}>
      <Switch>
        {routes.map((el: any, i: number) => (
          <Route exact name={i} key={i} path={el.path} component={el.component} />
        ))}
      </Switch>
    </Router>
)
export { App }
