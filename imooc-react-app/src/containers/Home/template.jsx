import React from 'react'
import {connect} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Template extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div>template</div>
    )
  }
}

function mapStateToProps(state) {
}

function mapDispatchToProps(dispatch) {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)()
