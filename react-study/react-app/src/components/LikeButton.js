/**
 * Created by Administrator on 2017/8/16 0016.
 */

import React from 'react'

export let LikeButton = React.createClass ({
  getInitialState() {
    return{liked: false}
  },
  handleClick() {
    this.setState({
      liked: !this.state.liked
    })
  },
  render() {
    let text = this.state.liked ? 'liked' : 'haven\'t liked'

    return (
      <p onClick={this.handleClick}>
        You {text} this. click to toggle
      </p>
    )
  }
})
