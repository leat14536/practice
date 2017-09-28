/**
 * Created by Administrator on 2017/9/28 0028.
 */
import {get} from '../get'
import {post} from '../post'

export function getOrderListData(username) {
  return get('/api/orderlist/' + username)
}


export function postComment(id, comment) {
  return post('/api/submitComment', {
    id,comment
  })
}
