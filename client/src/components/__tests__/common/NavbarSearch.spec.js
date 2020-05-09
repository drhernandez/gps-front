import React from 'react'
import renderer from 'react-test-renderer'

import NavbarSearch from '../../common/search/NavbarSearch'

describe('NavbarSearch component', () => {

  it('snapshot', async () => {
    const componet = renderer.create(
      <NavbarSearch />
    )

    expect(componet.toJSON).toMatchSnapshot()
  })
})