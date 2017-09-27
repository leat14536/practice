/**
 * Created by Administrator on 2017/9/27 0027.
 */
import {get} from '../get'

export function getInfoData(id) {
  return get('/api/detail/info/' + id)
}

export function getCommentData(page, id) {
  return get('/api/detail/comment/' + page + '/' + id)
}
