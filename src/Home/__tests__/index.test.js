import React from 'react'
import renderer from 'react-test-renderer'
import ReactTestUtils from 'react-dom/test-utils'
import { shallow } from 'enzyme'
import { Home } from '..'

import * as enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

// Enzyme configuration
enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Home Test', () => {
  test('Home component renders', () => {
    const component = renderer.create(<Home />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })


  // test('click on Button should update display', () => {
  //   const mockCallBack = jest.fn()
  //   const button = shallow((<Button />))
  //   expect(button.text()).toEqual(String(0))
  //   button.find('button').simulate('click')
  //   expect(button.text()).toEqual(String(1))
  //   button.find('button').simulate('click')
  //   expect(button.text()).toEqual(String(2))
  // })
})
