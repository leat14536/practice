import React from 'react'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Item from './Item'

export default class OrderList extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const data = this.props.data

    return (
      <div>{
        data.map(((item, index) => {
          return <Item key={index} data={item} submitComment={this.props.submitComment}/>
        }))
      }</div>
    )
  }
}

