import React, { PureComponent, Fragment } from 'react'
import { Layout } from '../Layout'
import { MarkdownRenderer } from '../MarkdownRenderer'
import md from '~/docs/not-found.md'

class NotFound extends PureComponent {
  render = () => (
    <Layout>
      <MarkdownRenderer md={md} />
    </Layout>
  )
}

export { NotFound }
