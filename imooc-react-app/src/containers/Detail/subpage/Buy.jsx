import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {withRouter} from 'react-router-dom'
import BuyAndStore from 'components/BuyAndStore'
import {bindActionCreators} from 'redux'

import {connect} from 'react-redux'

import * as storeActionsFromFile from 'reduxDir/actions/store'

class Buy extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      isStore: false
    }
  }

  render() {
    return (
      <BuyAndStore
        isStore={this.state.isStore}
        storeHandle={this.storeHandle.bind(this)}
        buyHandle={this.buyHandle.bind(this)}
      />
    )
  }

  componentDidMount() {
    this.checkStoreState()
  }

  checkStoreState() {
    const id = this.props.id
    const store = this.props.store

    store.forEach(item => {
      if (item.id === id) {
        // 已经被收藏
        this.setState({
          isStore: true
        })
        return false
      }
    })
  }

  loginCheck() {
    const id = this.props.id
    const userinfo = this.props.userinfo
    if (!userinfo.username) {
      this.props.history.push('/login/' + encodeURIComponent('/detail/' + id))
      return false
    }
    return true
  }

  storeHandle() {
    const loginFlag = this.loginCheck()
    if(!loginFlag) return

    const id = this.props.id
    const storeActions = this.props.storeActions

    if (this.state.isStore) {
      // 已经被收藏了，则取消收藏
      storeActions.rm({id: id})
    } else {
      // 未收藏，则添加到收藏中
      storeActions.add({id: id})
    }

    this.setState({
      isStore: !this.state.isStore
    })
  }

  buyHandle() {
    const loginFlag = this.loginCheck()
    if(!loginFlag) return

    // 购买过程

    // 返回用户界面
    this.props.history.push('/user')
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo,
    store: state.store
  }
}

function mapDispatchToProps(dispatch) {
  return {
    storeActions: bindActionCreators(storeActionsFromFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Buy))
