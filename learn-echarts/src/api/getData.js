/**
 * Created by Administrator on 2017/9/30 0030.
 */
import {get} from '../fetch/get'
export function getData(id) {
  return get('/api/sp500hst/item/' + id)
    .then(res => res.json())
    .then(json => {
      if (json.code === 0) {
        return json.data
      }
    })
}

export function getNames(){
  return get('/api/sp500hst/names')
    .then(res => res.json())
    .then(json => {
      if (json.code === 0) {
        return json.data
      }
    })
}
