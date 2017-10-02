/**
 * Created by Administrator on 2017/9/30 0030.
 */
import {getData} from './api/getData'
import {
  ecInit,
  setCandlestickBaseOption,
  addSyncData
} from './echartsOptions'

const chart = ecInit('#main')
const id = 'A'

getData(id).then(data => {
  setCandlestickBaseOption(chart, data, id + '公司', 30)
  return data
}).then(data => {
  addSyncData(chart, data, 200, 1, 30)
})
