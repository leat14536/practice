import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SearchInput from '../SearchInput'

import './homeHeader.scss'

class HomeHeader extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      kwd: ''
    }
  }

  render() {
    return (
      <div id="home-header" className="clear-fix">
        <div className="home-header-left float-left">
          <Link to="city">
            <span>{this.props.cityName}</span>
            &nbsp;
            <i className="icon-angle-down"></i>
          </Link>
        </div>
        <div className="home-header-right float-right">
          <Link to="login">
            <i className="icon-user"></i>
          </Link>
        </div>
        <div className="home-header-middle">
          <div className="search-container">
            <i className="icon-search"></i>
            <SearchInput enterHandle={this.enterHandle.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }

  enterHandle(value) {
    if (value === '') return
    this.props.history.push('/search?key=' + encodeURIComponent(value))
  }
}

export default withRouter(HomeHeader)
