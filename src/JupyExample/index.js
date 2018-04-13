// @flow
import React, { PureComponent, Fragment } from 'react'
import { Layout } from '../Layout'
import { JupyterRenderer } from '../JupyterRenderer'

type Props = {};
type State = {};

class JupyExample extends PureComponent<Props, State> {
  render = () => (
    <Layout>
      <JupyterRenderer />
    </Layout>
  )
}
export { JupyExample }
