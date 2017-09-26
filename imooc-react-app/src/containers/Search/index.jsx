import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {withRouter} from 'react-router-dom'

import SearchHeader from 'components/SearchHeader'
import SearchList from './subpage/List'

class Search extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const search = this.props.location.search.substr(1).split('=')
    return (
      <div>
        <SearchHeader value={search[1]}/>
        <SearchList value={search[1]} category={search[0]}/>
      </div>
    )
  }

  // componentDidMount() {
  //   const search = this.props.location.search.substr(1).split('=')
  //   console.log(`search ${search[0]}: ${search[1]}`)
  // }
}

export default withRouter(Search)
