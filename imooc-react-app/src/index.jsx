/**
 * Created by Administrator on 2017/9/24 0024.
 */
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {configureStore} from './redux/store/configureStore'
import {RouterMap} from './router'

/* css */
import './common/styles/reset.scss'
import './common/styles/font.css'
import './common/styles/common.scss'

const store = configureStore()

render(
  <Provider store={store}>
    <RouterMap/>
  </Provider>,
  document.querySelector('#root')
)
