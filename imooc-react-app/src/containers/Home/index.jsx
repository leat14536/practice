import React from 'react'
import {connect} from 'react-redux'
import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Home extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div>
        <HomeHeader cityName={this.props.userinfo.cityName}/>
        <Category/>
        <div style={{height:'15px'}}>{/* 分割线 */}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
