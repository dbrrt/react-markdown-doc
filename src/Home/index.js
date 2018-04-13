// @flow
import React, { PureComponent, Fragment } from 'react'
import { Layout } from '../Layout'
import { MarkdownRenderer } from '../MarkdownRenderer'
// $FlowFixMe
import md from '~/docs/home.md'

type Props = {};
type State = {};

class Home extends PureComponent<Props, State> {
  render = () => (
    <Layout>
      <MarkdownRenderer md={md} />
    </Layout>
  )
}
export { Home }
