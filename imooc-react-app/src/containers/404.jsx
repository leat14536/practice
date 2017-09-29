import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class Template extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div>404 NOT FOUND</div>
    )
  }
}
