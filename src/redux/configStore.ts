import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const composeEnhancers =
  ((window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose

export default (): any => createStore(reducers, composeEnhancers(applyMiddleware(thunk)))
