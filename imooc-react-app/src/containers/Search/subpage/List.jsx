import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'

import ListComponent from 'components/List'
import ListMore from 'components/LoadMore'

import {getSearchData} from 'fetchDir/search/search'

function getInitialState() {
  return {
    data: [],
    hasMore: false,
    isLoadingMore: false,
    page: 0
  }
}

class SearchList extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = getInitialState()
  }

  render() {
    return (
      <div>
        {
          this.state.data.length
            ? <ListComponent data={this.state.data}/>
            : <div>加载中</div>
        }
        {
          this.state.hasMore
            ? <ListMore loadMoreFn={this.loadMoreFn.bind(this)}/>
            : ''
        }
      </div>
    )
  }

  loadMoreFn() {
    this.setState({
      isLoadingMore: true
    })

    const cityName = this.props.userinfo.cityName
    const page = this.state.page
    const keyword = this.props.keyword || ''
    const category = this.props.category
    const result = getSearchData(page, cityName, category, keyword)
    this.resultHandle(result)

    // 更新状态
    this.setState({
      isLoadingMore: false
    })
  }

  componentDidMount() {
    if (!this.props.userinfo.cityName) return
    this.loadFirstPageData()
  }

  componentDidUpdate(newProps) {
    const userinfo = this.props.userinfo
    const category = this.props.category
    if (newProps.userinfo.cityName === userinfo.cityName
      && category === newProps.category) return
    this.setState(getInitialState())
    this.loadFirstPageData()
  }

  loadFirstPageData() {
    const cityName = this.props.userinfo.cityName
    const page = this.state.page
    const keyword = this.props.keyword || ''
    const category = this.props.category
    const result = getSearchData(page, cityName, category, keyword)
    this.resultHandle(result)
  }

  resultHandle(result) {
    const page = this.state.page
    this.setState({
      page: page + 1
    })
    result.then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          const {data, hasMore} = json.data
          this.setState({
            hasMore,
            data: this.state.data.concat(data)
          })
        }
      })
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchList)
