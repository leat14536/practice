import React from 'react'
import Home from './Home'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFromOtherFile from '../redux/actions/userinfo'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class App extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div>
        <Home/>
      </div>
    )
  }

  componentDidMount() {
    const cityName = '北京'

    this.props.userInfoActions.update({
      cityName
    })
  }
}

function mapStateToProps(state) {
  return {
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
)(App)
