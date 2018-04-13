import React, { PureComponent, Fragment } from 'react'
import { MarkdownRenderer } from '../MarkdownRenderer'
import md from '~/docs/home.md'

class Home extends PureComponent {
  render = () => <MarkdownRenderer md={md} />
}
export { Home }
