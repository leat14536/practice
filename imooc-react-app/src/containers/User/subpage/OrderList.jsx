import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import OrderListComponent from 'components/OrderList'

import {getOrderListData, postComment} from 'fetchDir/user/user'

import './orderList.scss'

export default class OrderList extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <div className="order-list-container">
        <h2>您的订单</h2>
        {
          this.state.data.length
            ? <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
            : <div>loading</div>
        }
      </div>
    )
  }

  componentDidMount() {
    // 获取订单数据
    const username = this.props.username
    if (username) {
      this.loadOrderList(username)
    }
  }

  loadOrderList(username) {
    const result = getOrderListData(username)
    this.handleReault(result)
  }

  handleReault(result) {
    result
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          this.setState({
            data: json.data
          })
        } else throw 'orderlist 出错'
      })
      .catch(err => {
        /* eslint-disable */
        if (process.env.NODE_ENV === 'development') {
          console.error('orderlist 出错')
        }
      })
  }

  submitComment(id , value, callback) {
    const result = postComment(id, value)
    result.then(res => {
      return res.json()
    }).then(json => {
      if (json.code === 0) {
        // 已经评价，修改状态
        callback()
      }
    })
  }
}
