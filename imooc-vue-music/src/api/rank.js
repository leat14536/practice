/**
 * Created by Administrator on 2017/7/22 0022.
 */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    playform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    page: 'detail',
    tpl: 3,
    type: 'top',
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
