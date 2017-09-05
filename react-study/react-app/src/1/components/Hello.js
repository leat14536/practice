/**
 * Created by Administrator on 2017/8/16 0016.
 */
import React from 'react'
import RactDOM from 'react-dom'

export default class Hello extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      hello: <p>hello world. <a href="http://www.react-cn.com/">react中国</a></p>
    }
  }
  render() {
    return (
      <div>
        {this.state.hello}
      </div>
    )
  }
}
