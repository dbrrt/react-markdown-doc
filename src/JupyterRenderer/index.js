import React, { Component, Fragment } from 'react'
import Jupyter from '@kyso/react-jupyter'
import { MarkdownRenderer } from '../MarkdownRenderer'
// import notebookJSON from './python.ipynb'
import axios from 'axios'

class JupyterRenderer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      notebookJSON: null
    }
  }

  componentDidMount = () => {
    axios.get('assets/python.ipynb')
    .then((response) => {
      const {
        ['data']: notebookJSON
      } = response
      this.setState({ notebookJSON })
    })
  }

  render = () => {
    const {
      notebookJSON
    } = this.state

    return (
      <Fragment>
        {notebookJSON ?
          <Jupyter
            content={notebookJSON}
            showCode={true} // optional
            showOutput={true}
          />
          : null
        }

        Jupyter view
      </Fragment>
    )
  }
}

export { JupyterRenderer }
