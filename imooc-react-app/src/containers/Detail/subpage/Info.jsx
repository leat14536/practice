import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import DetailInfo from 'components/DetailInfo'
import {getInfoData} from 'fetchDir/detail/detail'

export default class Info extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      info: false
    }
  }

  render() {
    return (
      <div>
        {
          this.state.info
            ? <DetailInfo data={this.state.info}/>
            : ''
        }
      </div>
    )
  }

  componentDidMount() {
    this.getInfo()
  }

  getInfo() {
    const id = this.props.id
    const result = getInfoData(id)

    result.then(res => res.json())
      .then(json => {
        if(json.code === 0) {
          this.setState({
            info: json.data
          })
        } else throw '详情出错'
      })
      .catch(err => {
        /* eslint-disable */
        if(process.env.NODE_ENV === 'development') {
          console.error('详情出错' + err)
        }
      })
  }
}
