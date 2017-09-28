/**
 * Created by Administrator on 2017/9/24 0024.
 */
import {combineReducers} from 'redux'
import {userinfo} from './userinfo'
import {store} from './store'

export const rootReducer = combineReducers({
  userinfo,
  store
})
