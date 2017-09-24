/**
 * Created by Administrator on 2017/9/24 0024.
 */
import * as actionTypes from '../constants/userinfo'

export function update(data) {
  return {
    type: actionTypes.USERINFO_UPDATE,
    data
  }
}
