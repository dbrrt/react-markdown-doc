import React, { PureComponent, Fragment } from 'react'
import marked from 'marked'
import __html from '~/docs/home.md'

class Home extends PureComponent {
  render = () => {
    return (
      <Fragment>
        <div dangerouslySetInnerHTML={{ __html }} />
      </Fragment>
    )
  }
}

export { Home }
