import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import storeConfig from './redux/configStore'

import App from './App'

import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

const store = storeConfig()

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
