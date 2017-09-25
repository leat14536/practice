import React from 'react'
import {connect} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './homeAd.scss'

export default class HomeAd extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div id="home-ad">
        <h2>超值特惠</h2>
        <div className="ad-container clear-fix">
          {this.props.data.map((item, index) => (
            <div key={index} className="ad-item float-left">
              <a href={item.link} target="_blank">
                <img src={item.img} alt={item.title}/>
              </a>
            </div>
            ))}
        </div>
      </div>
    )
  }
}
