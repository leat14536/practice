import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

import LoginComponent from 'components/Login'
import Header from 'components/Header'

import * as userInfoActionsFromOtherFile from 'reduxDir/actions/userinfo'

class Login extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      checking: true
    }
  }

  render() {
    return (
      <div>
        <Header title="登录"/>
        {
          this.state.checking
            ? <div>等待中</div>
            : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
        }
      </div>
    )
  }

  loginHandle(username) {
    const actions = this.props.userInfoActions
    const userinfo = this.props.userinfo
    userinfo.username = username
    actions.update(userinfo)

    const params = this.props.match.params
    const {router} = params

    if (router) {
      this.props.history.push(decodeURIComponent(router))
    } else {
      // 跳转到用户主页
      this.goUserPage()
    }
  }

  goUserPage() {
    this.props.history.push('/user')
  }

  componentDidMount() {
    this.doCheck()
  }

  doCheck() {
    const userinfo = this.props.userinfo
    if (userinfo.username) {
      // 已经登录，则跳转到用户主页
      this.goUserPage()
    } else {
      // 未登录，则验证结束
      this.setState({
        checking: false
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login))
