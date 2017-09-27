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

const homeListData = require('../mockData/homeListData.js')
apiRoute.get('/homelist/:city/:page', (req, res) => {
  // const params = req.params
  // const paramsCity = params.city
  // const paramsPage = params.page

  res.json({
    code: 0,
    data: homeListData
  })
})

const searchListData = require('../mockData/searchListData.js')
apiRoute.get('/search/:page/:city/:category/:keyword', (req, res) => {
  // const params = req.params
  // const paramsPage = params.page
  // const paramsCity = params.city
  // const paramsCategory = params.category
  // const paramsKeyword = params.keyword
  //
  // console.log('当前页数：' + paramsPage)
  // console.log('当前城市：' + paramsCity)
  // console.log('当前类别：' + paramsCategory)
  // console.log('关键字：' + paramsKeyword)

  res.json({
    code: 0,
    data: searchListData
  })
})

apiRoute.get('/search/:page/:city/:category', (req, res) => {
  // 参数
  // const params = req.params
  // const paramsPage = params.page
  // const paramsCity = params.city
  // const paramsCategory = params.category
  //
  // console.log('当前页数：' + paramsPage)
  // console.log('当前城市：' + paramsCity)
  // console.log('当前类别：' + paramsCategory)

  res.json({
    code: 0,
    data: searchListData
  })
})

const detailInfo = require('../mockData/detailInfo.js')
apiRoute.get('/detail/info/:id', (req, res) => {
  console.log('详情页 - 商户信息')

  const params = req.params
  const id = params.id

  console.log('商户id: ' + id)

  res.json({
    code: 0,
    data: detailInfo
  })
})

const detailComment = require('../mockData/detailComment.js')
apiRoute.get('/detail/comment/:page/:id', (req, res) => {
  console.log('详情页 - 用户点评')

  const params = req.params
  const page = params.page
  const id = params.id

  console.log('商户id: ' + id)
  console.log('当前页数: ' + page)

  res.json({
    code: 0,
    data: detailComment
  })
})

module.exports = apiRoute
