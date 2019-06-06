import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import mainReducer from './reducers'

export default function configureStore() {
  let middleware = [thunk, promiseMiddleware()]
  if (process.env.NODE_ENV !== 'production') {
    const logger = require('redux-logger').default
    middleware = [...middleware, logger]
  }

  const store = createStore(mainReducer, applyMiddleware(...middleware))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
