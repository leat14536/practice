import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './currentCity.scss'

export default class CurrentCity extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="current-city">
        <h2>{this.props.cityName}</h2>
      </div>
    )
  }
}
