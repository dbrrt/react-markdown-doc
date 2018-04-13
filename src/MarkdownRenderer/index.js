import React, { PureComponent, Fragment } from 'react'
class MarkdownRenderer extends PureComponent {
  render = () => <div dangerouslySetInnerHTML={{ __html: this.props.md }} />
}
export { MarkdownRenderer }
