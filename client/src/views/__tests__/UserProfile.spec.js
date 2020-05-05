import React from 'react';
import renderer from 'react-test-renderer';

import UserProfile from "../UserProfile";

describe('ResetPassword component', () => {
  it("snapshot renders", () => {
    const component = renderer.create(
      <UserProfile />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});