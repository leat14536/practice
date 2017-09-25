import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './Item'

import './list.scss'

export default class ListComponent extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div className="list-container">
        {this.props.data.map((item, index) => (<Item key={index} data={item}/>))}
      </div>
    )
  }
}
