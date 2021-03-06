import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './Item.scss'

export default class Item extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      commentState: 2
    }
  }

  render() {
    const data = this.props.data

    return (
      <div className="clear-fix order-item-container">
        <div className="order-item-img float-left">
          <img src={data.img}/>
        </div>
        <div className="order-item-comment float-right">
          {
            this.state.commentState === 0
              ? <button className="btn" onClick={this.showComment.bind(this)}>评价</button>
              : this.state.commentState === 1
              ? ''
              : <button className="btn unseleted-btn">已评价</button>
          }
        </div>
        <div className="order-item-content">
          <span>商户：{data.title}</span>
          <span>数量：{data.count}</span>
          <span>价格：￥{data.price}</span>
        </div>
        {
          this.state.commentState === 1
            ? <div className="comment-text-container">
                <textarea style={{width: '100%', height: '80px'}} className="comment-text" ref="commentText"></textarea>
                <button className="btn" onClick={this.submitComment.bind(this)}>提交</button>
                &nbsp;
                <button className="btn unseleted-btn" onClick={this.hideComment.bind(this)}>取消</button>
              </div>
            : ''
        }
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      commentState: this.props.data.commentState
    })
  }

  submitComment() {
    // 获取操作函数
    const submitComment = this.props.submitComment
    // 获取id
    const id = this.props.data.id
    // 获取评价内容
    const commentText = this.refs.commentText
    const value = commentText.value.trim()
    if (!value) return

    // 执行数据提交
    submitComment(id, value, this.commentOk.bind(this))
  }

  commentOk() {
    // 已经评价，修改状态
    this.setState({
      commentState: 2
    })
  }

  hideComment() {
    this.setState({
      commentState: 0
    })
  }

  showComment() {
    this.setState({
      commentState: 1
    })
  }
}
