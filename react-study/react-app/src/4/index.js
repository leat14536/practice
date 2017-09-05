/**
 * Created by Administrator on 2017/9/3 0003.
 */
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import todoApp from './reducers/index'
import App from './components/App'

let store = createStore(todoApp)
console.log(store.getState())
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
