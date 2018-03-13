// @flow
import UniversalRouter from 'universal-router'
import routes from './routes'

const Router = new UniversalRouter(routes, {
  resolveRoute(context: { route: { load: Function } }, params: {}) {
    if (typeof context.route.load === 'function') {
      return context.route
        .load()
        .then((action: { default: Function }) => action
          .default(context, params))
    }
    if (typeof context.route.action === 'function') {
      return context.route.action(context, params)
    }
    return null
  }
})

export { Router }
