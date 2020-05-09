import React from 'react'
import renderer from 'react-test-renderer'

import Gmap from '../../common/maps/Gmap'

describe('Maps components', () => {

  it('Gmap snapshot', async () => {
    const componet = renderer.create(
      <Gmap />
    )

    expect(componet.toJSON).toMatchSnapshot()
  })
})