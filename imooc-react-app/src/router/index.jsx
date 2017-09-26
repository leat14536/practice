import React from 'react'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import App from '../containers'

export class RouterMap extends React.Component{
  constructor() {
    super()
  }
  render() {
    return (
      <Router>
        <Route path="/" component={App}/>
      </Router>
    )
  }
}
