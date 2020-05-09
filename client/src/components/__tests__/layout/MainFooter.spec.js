import React from 'react'
import renderer from 'react-test-renderer'

import MainFooter from '../../layout/MainFooter'

it('snapshot test', () => {
  const component = renderer.create(
    <MainFooter />
  )

  expect(component.toJSON()).toMatchSnapshot()
})