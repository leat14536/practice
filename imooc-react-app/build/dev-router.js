/**
 * Created by Administrator on 2017/9/25 0025.
 */
const apiRoute = require('express').Router()

const homeAdData = require('../mockData/homead.json')
apiRoute.get('/homead', (req, res) => {
  res.json({
    code: 0,
    data: homeAdData
  })
})

const homeListData = require('../mockData/homeListData.json')
apiRoute.get('/homelist/:city/:page', (req, res) => {
  // const params = req.params
  // const paramsCity = params.city
  // const paramsPage = params.page

  res.json({
    code: 0,
    data: homeListData
  })
})

const searchListData = require('../mockData/searchListData.json')
apiRoute.get('/search/:page/:city/:category/:keyword', (req, res) => {
  const params = req.params
  const paramsPage = params.page
  const paramsCity = params.city
  const paramsCategory = params.category
  const paramsKeyword = params.keyword

  console.log('当前页数：' + paramsPage)
  console.log('当前城市：' + paramsCity)
  console.log('当前类别：' + paramsCategory)
  console.log('关键字：' + paramsKeyword)

  res.json({
    code: 0,
    data: searchListData
  })
})

apiRoute.get('/search/:page/:city/:category', (req, res) => {
  // 参数
  const params = req.params
  const paramsPage = params.page
  const paramsCity = params.city
  const paramsCategory = params.category

  console.log('当前页数：' + paramsPage)
  console.log('当前城市：' + paramsCity)
  console.log('当前类别：' + paramsCategory)

  res.json({
    code: 0,
    data: searchListData
  })
})

module.exports = apiRoute
