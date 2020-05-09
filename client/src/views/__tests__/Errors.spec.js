import React from 'react';
import renderer from 'react-test-renderer';

import Errors from "../Errors"

describe('Errors view', () => {
  
  it("snapshot renders", () => {

    const component = renderer.create(
      <Errors />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});