// @flow
import React, { PureComponent, Fragment } from 'react'
import { type Props, type State } from './types'

class MarkdownRenderer extends PureComponent<Props, State> {
  render = () => <div dangerouslySetInnerHTML={{ __html: this.props.md }} />
}
export { MarkdownRenderer }
