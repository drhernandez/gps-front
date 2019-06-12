import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react-dom/test-utils';

import { Page } from 'react-blur-admin';

describe('Page', () => {
  it('renders an h1', () => {
    const component = ReactTestUtils.renderIntoDocument(<Page title='React Webpack Skeleton' />);
    const h1 = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    expect(h1.textContent).toEqual('React Webpack Skeleton');
  });
});
