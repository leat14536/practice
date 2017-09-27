import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from 'components/Header'

export default class User extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <Header title="用户中心" clickHandle={() => this.props.history.push('/')}/>
    )
  }
}
