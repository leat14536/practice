import React from 'react'
import Home from './Home'
import City from './City'
import User from './User'
import Search from './Search'
import Detail from './Detail'
import Template from './template'
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFromOtherFile from '../redux/actions/userinfo'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class App extends React.Component {
  constructor() {
    super(...arguments)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/city" component={City}/>
            <Route path="/user" component={User}/>
            <Route path="/search" component={Search}/>
            <Route path="/detail/:id" component={Detail}/>
            <Route path="*" component={Template}/>
          </Switch>
        </Router>
      </div>
    )
  }

  componentDidMount() {
    const cityName = '北京'

    this.props.userInfoActions.update({
      cityName
    })
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
