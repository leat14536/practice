/**
 * Created by Administrator on 2017/9/25 0025.
 */
const apiRoute = require('express').Router()
const url = require('url')
const request = require('request')

const homeAdData = require('../mokeData/homead.json')
apiRoute.get('/homead', (req, res) => {
  res.json({
    code: 0,
    data: homeAdData
  })
})

const homeListData = require('../mokeData/homeListData.json')
apiRoute.get('/homelist/:city/:page', (req, res) => {
  const params = req.params
  const paramsCity = params.city
  const paramsPage = params.page

  res.json({
    code: 0,
    data: homeListData
  })
})

module.exports = apiRoute
