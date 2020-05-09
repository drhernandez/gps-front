import React from 'react'
import { shallow } from 'enzyme'

import PageTitle from '../../common/PageTitle'

describe('PageTitle component', () => {

  it('should show title and subtitle', async () => {
    debugger
    const props = {
      title: "Usuarios",
      subtitle: "Alta de usuario"
    }
    const wrapper = shallow(
      <PageTitle {...props} />
    )

    expect(wrapper.find('h3').text()).toBe('Usuarios')
    expect(wrapper.find('span').text()).toBe('Alta de usuario')
  })
})