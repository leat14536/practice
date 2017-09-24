import React from 'react'
import ReactSwipe from 'react-swipe'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './category.scss'

export default class Category extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      index: 0
    }
  }

  render() {

    const opt = {
      auto: 2500,
      callback: (index) => {
        this.setState({
          index
        })
      }
    }

    return (
      <div id="home-category">
        <ReactSwipe swipeOptions={opt}>
          <div className="carousel-item">
            <ul className="clear-fix">
              <li className="float-left">景点</li>
              <li className="float-left">KTV</li>
              <li className="float-left">购物</li>
              <li className="float-left">生活服务</li>
              <li className="float-left">健身运动</li>
              <li className="float-left">美发</li>
              <li className="float-left">亲子</li>
              <li className="float-left">小吃快餐</li>
              <li className="float-left">自助餐</li>
              <li className="float-left">酒吧</li>
            </ul>
          </div>
          <div className="carousel-item">
            <ul className="clear-fix">
              <li className="float-left">美食</li>
              <li className="float-left">电影</li>
              <li className="float-left">酒店</li>
              <li className="float-left">休闲娱乐</li>
              <li className="float-left">外卖</li>
              <li className="float-left">火锅</li>
              <li className="float-left">丽人</li>
              <li className="float-left">度假出行</li>
              <li className="float-left">足疗按摩</li>
              <li className="float-left">周边游</li>
            </ul>
          </div>
          <div className="carousel-item">
            <ul className="clear-fix">
              <li className="float-left">日本菜</li>
              <li className="float-left">SPA</li>
              <li className="float-left">结婚</li>
              <li className="float-left">学习培训</li>
              <li className="float-left">西餐</li>
              <li className="float-left">火车机票</li>
              <li className="float-left">烧烤</li>
              <li className="float-left">家装</li>
              <li className="float-left">宠物</li>
              <li className="float-left">全部分类</li>
            </ul>
          </div>
        </ReactSwipe>
        <div className="index-container">
          <ul>
            <li className={this.state.index === 0 ? "selected" : ''}></li>
            <li className={this.state.index === 1 ? "selected" : ''}></li>
            <li className={this.state.index === 2 ? "selected" : ''}></li>
          </ul>
        </div>
      </div>
    )
  }
}
