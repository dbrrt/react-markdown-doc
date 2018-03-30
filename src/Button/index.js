import React, { Component, Fragment } from 'react'

class Button extends Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render = () => {

    const {
      count
    } = this.state

    return (
      <Fragment>
        <button onClick={() => this.setState({ count: count+1 })}>{count}</button>
      </Fragment>
    )
  }
}

export { Button }
