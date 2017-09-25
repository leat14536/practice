import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './loadMore.scss'

export default class LoadMore extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div className="load-more" ref="wrapper">
        {
          this.props.isLoadimgMore
          ? <div>加载中</div>
          : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
        }
      </div>
    )
  }

  loadMoreHandle() {
    this.props.loadMoreFn()
  }
}
