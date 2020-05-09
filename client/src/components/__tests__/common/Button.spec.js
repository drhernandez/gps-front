import React from 'react'
import { shallow } from 'enzyme'

import Button from '../../common/Button'

describe('Button component', () => {

  it('should load button with label', async () => {
    const props = {
      showSppiner: false,
      label: "guardar"
    }
    const wrapper = shallow(
      <Button {...props} />
    )

    expect(wrapper.find('Spinner')).toHaveLength(0)
    expect(wrapper.children().text()).toBe('guardar')
  })

  it('should load sppiner', async () => {
    debugger
    const props = {
      showSppiner: true
    }
    const wrapper = shallow(
      <Button {...props} />
    )

    expect(wrapper.find('Spinner')).toHaveLength(1)
  })
})