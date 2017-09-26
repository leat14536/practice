import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class SearchInput extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <input type="text"
             className="search-input"
             placeholder="请输入关键字"
             onChange={this.ChangeHandle.bind(this)}
             onKeyUp={this.KeyUpHandle.bind(this)}
             value={this.state.value}
      />
    )
  }

  componentDidMount() {
    // 默认值
    this.setState({
      value: this.props.value || ''
    })
  }

  ChangeHandle(e) {
    // 监控变化
    this.setState({
      value: e.target.value
    })
  }

  KeyUpHandle(e) {
    // 监控 enter 事件
    if (e.keyCode !== 13) return
    this.props.enterHandle(e.target.value)
  }
}
