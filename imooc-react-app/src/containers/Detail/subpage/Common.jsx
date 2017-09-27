import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {getCommentData} from 'fetchDir/detail/detail'

import CommentList from 'components/CommentList'
import LoadMore from 'components/LoadMore'

import './common.scss'

export default class Common extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: [],
      hasMore: false,
      isLoadingMore: false,
      page: 0
    }
  }

  render() {
    return (
      <div className="detail-comment-subpage">
        <h2>用户点评</h2>
        {
          this.state.data.length
            ? <CommentList data={this.state.data}/>
            : <div>加载中</div>
        }
        {
          this.state.hasMore
            ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
            : ''
        }
      </div>
    )
  }

  loadMoreData() {
    this.setState({
      isLoadingMore: true
    })

    const id = this.props.id
    const page = this.state.page + 1
    const result = getCommentData(page, id)
    this.resultHandle(result)

    // 增加 page 技术
    this.setState({
      isLoadingMore: false,
      page: page
    })
  }

  componentDidMount() {
    this.loadFirstPageData()
  }

  loadFirstPageData() {
    const id = this.props.id
    const result = getCommentData(0, id)
    this.resultHandle(result)
  }

  resultHandle(result) {
    result.then(res => res.json())
      .then(json => {
        const {data, hasMore} = json.data
        if (json.code === 0) {
          this.setState({
            data: this.state.data.concat(data),
            hasMore
          })
        } else {
          throw '评论详情出错'
        }
      })
      .catch(err => {
        /* eslint-disable */
        if (process.env.NODE_ENV === 'development') {
          console.err('评论详情出错' + err)
        }
      })
  }
}
