import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Home from './Home'
import City from './City'
import User from './User'
import Login from './Login'
import Search from './Search'
import Detail from './Detail'
import NotFound from './404'

import * as userInfoActionsFromOtherFile from 'reduxDir/actions/userinfo'

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
            <Route path='/login/:router' component={Login}/>
            <Route path='/login' component={Login}/>
            <Route path="/search" component={Search}/>
            <Route path="/detail/:id" component={Detail}/>
            <Route path="/detail" component={Detail}/>
            <Route path="*" component={NotFound}/>
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
