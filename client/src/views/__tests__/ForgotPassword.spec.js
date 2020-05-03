import React from 'react';
import renderer from 'react-test-renderer';
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history'
import { shallow, mount } from 'enzyme';

jest.mock("../../api/services/recoveryService", () => ({ generateToken: jest.fn() }));
import RecoveryService from '../../api/services/recoveryService';

import ForgotPassword from "../ForgotPassword"

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('ForgotPassword view', () => {
  beforeEach(async () => {
    jest.resetModules();
    jest.useFakeTimers()

    await RecoveryService.generateToken.mockImplementation(() => {
      return Promise.resolve();
    });
  });

  it("snapshot renders", () => {
    const history = createMemoryHistory()
    const component = renderer.create(
      <Router history={history}>
        <ForgotPassword />
      </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Link Volver al login should redirect to login", () => {
    const wrapper = shallow(
      <ForgotPassword.WrappedComponent />
    );

    expect(wrapper.find('Link').at(0).props().to).toBe('/signin')
  });

  it("Should redirect to login when button is pressed", async () => {
    const history = createMemoryHistory({
      initialEntries: ['/forgot-password']
    });
    const wrapper = mount(
      <Router history={history}>
        <ForgotPassword />
      </Router>
    );

    const mockedEvent = {
      target: {
        'email': {
          value: 'test@test.com'
        }
      },
      preventDefault: () => { },
      persist: () => { }
    }

    expect(history.location.pathname).toBe("/forgot-password")

    wrapper.find('ForgotPassword').instance().restorePassword(mockedEvent);
    await flushPromises();
    jest.runAllTimers();

    expect(history.location.pathname).toBe("/signin")
  });
});