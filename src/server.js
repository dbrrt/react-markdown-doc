// @flow
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt'
import React from 'react'
import ReactDOM from 'react-dom/server'
import PrettyError from 'pretty-error'
import App from './components/App';
import Html from './components/Html';
// import { ErrorPageWithoutStyle } from './routes/error/ErrorPage'
// import errorPageStyle from './routes/error/ErrorPage.css'
import { Router } from './router'
import assets from './assets.json' // eslint-disable-line import/no-unresolved
import config from './config'

import configureStore from './store/configureStore'
import { setRuntimeVariable } from './actions/runtime'

import models from './data/models';
import schema from './data/schema';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import nodeFetch from 'node-fetch'
import { getDataFromTree } from 'react-apollo'
import createApolloClient from './core/createApolloClient'
import { graphql } from 'graphql'
import createFetch from './createFetch'
import Promise from 'bluebird'
// Data store
// import { createStore, combineReducers } from 'redux'
// import { Provider } from 'react-redux'

// import * as reducers from './store/reducers'
// const reducer = combineReducers({ ...reducers })
//
// const store = createStore(
//   reducer,
//   // if window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

process.on('unhandledRejection', (reason, p) => { // eslint-disable-line
  console.error('Unhandled Rejection at:', p, 'reason:', reason)// eslint-disable-line
  // send entire app down. Process manager will restart it
  process.exit(1)// eslint-disable-line
})

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {}
global.navigator.userAgent = global.navigator.userAgent || 'all'

const app = express()

// GRAPHQL
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })) // Playground

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------

app.set('trust proxy', config.trustProxy)

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public'))) // eslint-disable-line
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: (req: { cookies: { id_token: string }}) => req.cookies.id_token,
  })
)
// Error handler for express-jwt
app.use((
  err: {  },
  req: { cookies: { id_token: string } },
  res: { clearCookie: Function },
  next: Function) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token) // eslint-disable-line
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token')
  }
  next(err)
})

// app.use(passport.initialize())

// app.get(
//   '/login/facebook',
//   passport.authenticate('facebook', {
//     scope: ['email', 'user_location'],
//     session: false,
//   }),
// )
// app.get(
//   '/login/facebook/return',
//   passport.authenticate('facebook', {
//     failureRedirect: '/login',
//     session: false,
//   }),
//   (req: { user: {} }, res: { cookie: Function, redirect: Function }) => {
//     const expiresIn = 60 * 60 * 24 * 180// 180 days
//     const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn })
//     res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true })
//     res.redirect('/')
//   }
// )

//
// Register API middleware
// -----------------------------------------------------------------------------
// app.use(
//   '/graphql',
//   expressGraphQL((req: {}) => ({
//     schema,
//     graphiql: true, // eslint-line-disable
//     rootValue: { request: req },
//     pretty: true, // eslint-line-disable
//   })),
// )

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req: { path: string, query: string }, res: { redirect: Function, send: Function, status: Function }, next: Function) => {

  try {
    const css = new Set()

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles: any) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()))
    }

    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req }
    })

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
      apolloClient,
      schema,
      graphql
    })

    const initialState = {
      user: req.user || null
    }

    const store = configureStore(initialState, {
      cookie: req.headers.cookie,
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
      // history: null
    })

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    )

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
      // Apollo Client for use with react-apollo
      client: apolloClient,
    }

    const route = await Router.resolve(context)

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect)
      return
    }

    const data = { ...route }
    const rootComponent = <App context={context}>{route.component}</App>
    await getDataFromTree(rootComponent)
    // this is here because of Apollo redux APOLLO_QUERY_STOP action
    await Promise.delay(100)
    // rootComponent.type = 'app' // DEBUG prod
    data.children = await ReactDOM.renderToString(rootComponent)
    data.styles = [{ id: 'css', cssText: [...css].join('') }]

    data.scripts = assets && assets.vendor ? [assets.vendor.js] : []
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js))
    }
    data.scripts.push(assets.client.js)

    // Furthermore invoked actions will be ignored, client will not receive them!
    // if (__DEV__) {
    //   // eslint-disable-next-line no-console
    //   console.log('Serializing store...')
    // }
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
      apolloState: context.client.extract()
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)
    res.status(route.status || 200)
    res.send(`<!doctype html>${html}`)
  } catch (err) {
    next(err)
  }

})

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

// eslint-disable-next-line no-unused-vars
// app.use((err: { message: string }, req: {}, res: { status: Function, send: Function }, next: Function) => {
//   console.error(pe.render(err)) // eslint-disable-line
//   const html = ReactDOM
//     .renderToStaticMarkup(
//       <Html
//         title='Internal Server Error'
//         description={err.message}
//         styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]}>
//         {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
//       </Html>)
//   res.status(err.status || 500)
//   res.send(`<!doctype html>${html}`)
// })

//
// Launch the server
// -----------------------------------------------------------------------------
// const promise = models.sync().catch(err => console.error(err.stack)) // eslint-disable-line
// $FlowFixMe
if (!module.hot) {
  // promise.then(() => {
  app.listen(config.port, () => console // eslint-disable-line
    .info(`The server is running at http://localhost:${config.port}/`) // eslint-disable-line
  )
  // })
}
//
// Hot Module Replacement
// -----------------------------------------------------------------------------
// $FlowFixMe
if (module.hot) {
  app.hot = module.hot
  // $FlowFixMe
  module.hot.accept('./router')
}

export default app
