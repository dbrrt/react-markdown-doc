import React from 'react'
import renderer from 'react-test-renderer'
import ReactTestUtils from 'react-dom/test-utils'
import { shallow } from 'enzyme'
import { Button } from '../Button'

import * as enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

// Enzyme configuration
enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Button Test', () => {
  test('Button component renders', () => {
    const component = renderer.create(<Button />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })


  test('click on Button should update display', () => {
    const mockCallBack = jest.fn()
    const button = shallow((<Button />))
    expect(button.text()).toEqual(String(0))
    button.find('button').simulate('click')
    expect(button.text()).toEqual(String(1))
    button.find('button').simulate('click')
    expect(button.text()).toEqual(String(2))
  })
})
