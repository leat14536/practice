import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {withRouter} from 'react-router-dom'
import './header.scss'

class Header extends React.Component {
  constructor(props) {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div id="header">
        <span className="back-icon" onClick={this.clickHandle.bind(this)}>
          <i className="icon-chevron-left"></i>
        </span>
        <h1>{this.props.title}</h1>
      </div>
    )
  }

  clickHandle() {
    const backRouter = this.props.backRouter
    if (backRouter) {
      this.props.history.push(backRouter)
    } else {
      this.props.history.goBack()
    }
  }
}

export default withRouter(Header)
