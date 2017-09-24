/**
 * Created by Administrator on 2017/9/24 0024.
 */
import * as actionType from '../constants/userinfo'

const initState = {}

export function userinfo(state = initState, action) {
  switch (action.type) {
    case actionType.USERINFO_UPDATE:
      return action.data
    default:
      return state
  }
}
