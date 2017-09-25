import React from 'react'
import {connect} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getAdData} from 'fetchDir/home/home'
import HomeAd from 'components/HomeAd'

export default class Ad extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: []
    }
  }

  render() {

    return (
      <div>{
        this.state.data.length
          ? <HomeAd data={this.state.data}/>
          : <div>加载中</div>
      }</div>
    )
  }

  componentDidMount() {
    const result = getAdData()

    result.then(res => res.json())
      .then(data => {
        if (data.code === 0) {
          this.setState({
            data: data.data
          })
        } else {
          throw '数据获取失败'
        }
      })
      .catch(err => {
        /* eslint-disable */
        if(process.env.NODE_ENV=== 'development') {
          console.error('首页广告模块获取数据报错, ', err)
        }
      })
  }
}
