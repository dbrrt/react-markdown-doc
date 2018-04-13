import React, { PureComponent, Fragment } from 'react'
import { MarkdownRenderer } from '../MarkdownRenderer'
import md from '~/docs/not-found.md'

class NotFound extends PureComponent {
  render = () => <MarkdownRenderer md={md} />
}

export { NotFound }
