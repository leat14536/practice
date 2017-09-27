import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {withRouter} from 'react-router-dom'

import Header from 'components/Header'
import Info from './subpage/Info'
import Common from './subpage/Common'

class Detail extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const id = this.props.match.params.id
    return (
      <div className="wrap">
        <Header title="商户详情"/>
        <Info id={id}/>
        <Common id={id}/>
      </div>
    )
  }
}

export default withRouter(Detail)
