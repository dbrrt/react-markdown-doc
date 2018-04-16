// @flow
import React, { PureComponent, Fragment } from 'react'
import { Layout } from '../Layout'
import { MarkdownRenderer } from '../MarkdownRenderer'

type Props = { md: any };
type State = {};

class GenericView extends PureComponent<Props, State> {
  render = () => (
    <Layout>
      <MarkdownRenderer md={this.props.md} />
    </Layout>
  )
}
export { GenericView }
