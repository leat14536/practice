import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {withRouter} from 'react-router-dom'

import SearchInput from '../SearchInput'

import './searchHeader.scss'

class SearchHeader extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div id="search-header" className="clear-fix">
        <span className="back-icon float-left" onClick={this.clickHandle.bind(this)}>
          <i className="icon-chevron-left"></i>
        </span>
        <div className="input-container">
          <i className="icon-search"></i>
          &nbsp;
          <SearchInput value={this.props.value} enterHandle={this.enterHandle.bind(this)}/>
        </div>
      </div>
    )
  }

  enterHandle(value) {
    this.props.history.push('/search?key=' + encodeURIComponent(value))
  }

  clickHandle() {
    this.props.history.goBack()
  }
}

export default withRouter(SearchHeader)
