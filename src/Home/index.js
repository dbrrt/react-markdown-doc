import React, { PureComponent, Fragment } from 'react'
import { Layout } from '../Layout'
import { MarkdownRenderer } from '../MarkdownRenderer'
import md from '~/docs/home.md'

class Home extends PureComponent {
  render = () => (
    <Layout>
      <MarkdownRenderer md={md} />
    </Layout>
  )
}
export { Home }
