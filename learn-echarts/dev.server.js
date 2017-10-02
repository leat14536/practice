/**
 * Created by Administrator on 2017/9/30 0030.
 */
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const resolve = path.resolve

let sp500hst = {}
fs.readFile(resolve('./file/sp500hst.txt'), (err, data) => {
  if (!err) {
    const str = data.toString()
    str.split('\n').forEach(data => {
      const arr = data.split(',')
      if (arr.length < 7) return
      const name = arr.splice(1, 1)[0]
      if (!sp500hst[name]) sp500hst[name] = []
      sp500hst[name].push(arr)
    })
  }
})

let citysData = {}
fs.readFile(resolve('./file/aqi.csv'), (err, data) => {
  const strs = data.toString().split('\n')
  strs.forEach(str => {
    const detail = str.split(',')
    if (!detail.length) return
    const date = detail[5]
    if (!citysData[date]) citysData[date] = []
    citysData[date].push({
      division: detail[1],
      areaName: detail[2],
      value: detail[3],
      pollutant: detail[4],
      date: detail[5]
    })
  })
})


const apiRouter = express.Router()

apiRouter.get('/sp500hst/item/:id', (req, res) => {
  const id = req.params.id
  if (!sp500hst[id]) {
    res.json({
      code: 1,
      msg: '无数据'
    })
    return
  }
  res.json({
    code: 0,
    data: sp500hst[id]
  })
})

apiRouter.get('/sp500hst/names', (req, res) => {
  res.json({
    code: 0,
    data: Object.keys(sp500hst)
  })
})

apiRouter.get('/aqidata/dates', (req, res) => {
  res.json({
    code: 0,
    data: Object.keys(citysData)
  })
})

apiRouter.get('/aqidata/detail', (req, res) => {
  let {page, num} = req.query
  page = +page
  num = +num
  const keys = Object.keys(citysData)
  if (keys.length < page * num) {
    res.json({
      code: 1,
      msg: '超出范围'
    })
  } else {
    res.json({
      code: 0,
      data: keys.slice(
        page * num,
        Math.min(keys.length - 1, (1 + page) * num)
      ).map(key => citysData[key])
    })
  }
})

app.use(express.static('./test'))
app.use('/api', apiRouter)
app.use('/', apiRouter)
const port = 8888
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
