import React from 'react'
import renderer from 'react-test-renderer'
import ReactTestUtils from 'react-dom/test-utils'
import { shallow } from 'enzyme'
import { MarkdownRenderer } from '..'

import * as enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

// Enzyme configuration
enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Markdown Component Test', () => {
  test('Markdown Component Test renders', () => {
    const md = '#TITLE\n##SUB1'
    const component = renderer.create(<MarkdownRenderer md={md} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

})
