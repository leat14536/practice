import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './userInfo.scss'

export default class UserInfo extends React.Component {
    constructor() {
        super(...arguments)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return (
          <div className="userinfo-container">
            <p>
              <i className="icon-user"></i>
              &nbsp;
              <span>{this.props.username}</span>
            </p>
            <p>
              <i className="icon-map-marker"></i>
              &nbsp;
              <span>{this.props.city}</span>
            </p>
          </div>
        )
    }
}
