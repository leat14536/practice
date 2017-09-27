import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Item from './Item'

import './commentList.scss'

export default class CommentList extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const data = this.props.data

    return (
      <div className="comment-list">
        {
          data.map((item, index) => {
            return <Item key={index} data={item}/>
          })
        }
      </div>
    )
  }
}
