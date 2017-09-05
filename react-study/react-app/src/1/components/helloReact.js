/**
 * Created by Administrator on 2017/8/16 0016.
 */
import React from 'react'

export let HelloReact = React.createClass({
  render: function() {
    return (
      <p>
        Hello, <input type="text" placeholder="Your name here" />!
        It is {this.props.date.toTimeString()}
      </p>
    )
  }
})

