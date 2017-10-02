/**
 * Created by Administrator on 2017/10/2 0002.
 */
import {getUntitled} from './api/getData'
import {ecInit, addGraphOption} from './echartsOptions'
import dataTool from 'echarts/extension/dataTool'

import echarts from 'echarts'
const chart = ecInit('#main')

getUntitled()
  .then(res => res.text())
  .then(xml => {
    const graph = dataTool.gexf.parse(xml)
    addGraphOption(chart, graph)
  })

