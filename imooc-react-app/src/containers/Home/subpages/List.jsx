import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ListComponent from 'components/List'
import {getListData} from 'fetchDir/home/home'
import LoadMore from 'components/LoadMore'

import './list.scss'

export default class List extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: [],
      hasMore: false,
      isLoadingMore: false,
      page: 1
    }
  }

  render() {
    return (
      <div>
        <h2 className="home-list-title">猜你喜欢</h2>
        {
          this.state.data.length
            ? <ListComponent data={this.state.data}/>
            : <div>加载中</div>
        }
        {
          this.state.hasMore
            ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
            : ''
        }
      </div>
    )
  }

  componentDidMount() {
    if(!this.props.cityName) return
    this.loadFirstPageData(this.props.cityName)
  }

  componentWillReceiveProps(newProps) {
    this.loadFirstPageData(newProps.cityName)
  }

  loadFirstPageData(cityName) {
    const result = getListData(cityName, 0)
    this.resultHandle(result)
  }

  resultHandle(result) {
    result.then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          const {hasMore, data} = json.data
          this.setState({hasMore, data: this.state.data.concat(data)})
        } else {
          throw 'List 获取失败'
        }
      })
      .catch(err => {
        /* eslint-disable */
        if (process.env.NODE_ENV === 'development') {
          console.err('List 出错' + err)
        }
      })
  }

  loadMoreData() {
    this.setState({isLoadingMore: true})

    const cityName = this.props.cityName
    const page = this.state.page
    const result = getListData(cityName, page)

    this.resultHandle(result)
    this.setState({
      page: page + 1,
      isLoadingMore: false
    })
  }
}
