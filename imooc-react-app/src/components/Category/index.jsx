import React from 'react'
import ReactSwipe from 'react-swipe'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router-dom'

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
              <Link to="/search?category=jingdian"><li className="float-left jingdian">景点</li></Link>
              <Link to="/search?category=ktv"><li className="float-left ktv">KTV</li></Link>
              <Link to="/search?category=gouwu"><li className="float-left gouwu">购物</li></Link>
              <Link to="/search?category=shenghuofuwu"><li className="float-left shenghuofuwu">生活服务</li></Link>
              <Link to="/search?category=jianshenyundong"><li className="float-left jianshenyundong">健身运动</li></Link>
              <Link to="/search?category=meifa"><li className="float-left meifa">美发</li></Link>
              <Link to="/search?category=qinzi"><li className="float-left qinzi">亲子</li></Link>
              <Link to="/search?category=xiaochikuaican"><li className="float-left xiaochikuaican">小吃快餐</li></Link>
              <Link to="/search?category=zizhucan"><li className="float-left zizhucan">自助餐</li></Link>
              <Link to="/search?category=jiuba"><li className="float-left jiuba">酒吧</li></Link>
            </ul>
          </div>
          <div className="carousel-item">
            <ul className="clear-fix">
              <Link to="/search?category=meishi"><li className="float-left meishi">美食</li></Link>
              <Link to="/search?category=dianying"><li className="float-left dianying">电影</li></Link>
              <Link to="/search?category=jiudian"><li className="float-left jiudian">酒店</li></Link>
              <Link to="/search?category=xuixianyule"><li className="float-left xuixianyule">休闲娱乐</li></Link>
              <Link to="/search?category=waimai"><li className="float-left waimai">外卖</li></Link>
              <Link to="/search?category=huoguo"><li className="float-left huoguo">火锅</li></Link>
              <Link to="/search?category=liren"><li className="float-left liren">丽人</li></Link>
              <Link to="/search?category=dujiachuxing"><li className="float-left dujiachuxing">度假出行</li></Link>
              <Link to="/search?category=zuliaoanmo"><li className="float-left zuliaoanmo">足疗按摩</li></Link>
              <Link to="/search?category=zhoubianyou"><li className="float-left zhoubianyou">周边游</li></Link>
            </ul>
          </div>
          <div className="carousel-item">
            <ul className="clear-fix">
              <Link to="/search?category=ribencai"><li className="float-left ribencai">日本菜</li></Link>
              <Link to="/search?category=SPA"><li className="float-left SPA">SPA</li></Link>
              <Link to="/search?category=jiehun"><li className="float-left jiehun">结婚</li></Link>
              <Link to="/search?category=xuexipeixun"><li className="float-left xuexipeixun">学习培训</li></Link>
              <Link to="/search?category=xican"><li className="float-left xican">西餐</li></Link>
              <Link to="/search?category=huochejipiao"><li className="float-left huochejipiao">火车机票</li></Link>
              <Link to="/search?category=shaokao"><li className="float-left shaokao">烧烤</li></Link>
              <Link to="/search?category=jiazhuang"><li className="float-left jiazhuang">家装</li></Link>
              <Link to="/search?category=chongwu"><li className="float-left chongwu">宠物</li></Link>
              <Link to="/search?category=quanbufenlei"><li className="float-left quanbufenlei">全部分类</li></Link>
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
