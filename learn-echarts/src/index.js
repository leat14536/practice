/**
 * Created by Administrator on 2017/9/30 0030.
 */
import {getData} from './api/getData'
import {ecInit, setCandlestickOption} from './echartsOptions'

const chart = ecInit('#main')
const id = 'A'

getData(id).then(data =>
  setCandlestickOption(chart, data, id + '公司')
)
