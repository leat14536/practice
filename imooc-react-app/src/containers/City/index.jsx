import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {bindActionCreators} from 'redux'
import * as userInfoActionsFromOtherFile from 'reduxDir/actions/userinfo'

import Header from 'components/Header'
import CurrentCity from 'components/CurrentCity'
import CityList from 'components/CityList'

class City extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div>
        <Header title="选择城市"/>
        <CurrentCity cityName={this.props.userInfo.cityName}/>
        <CityList changeFn={this.changeCity.bind(this)}/>
      </div>
    )
  }

  changeCity(newCity) {
    if (!newCity) return

    this.props.userInfoActions.update({cityName: newCity})

    this.props.history.push('/')
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}

const CityCompoennt = connect(
  mapStateToProps,
  mapDispatchToProps
)(City)

export default withRouter(CityCompoennt)
