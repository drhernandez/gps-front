import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { Router } from "react-router-dom";
import { createMemoryHistory, createLocation } from 'history'

jest.mock("../../api/services/recoveryService", () => ({ validateRecoveryId: jest.fn(), resetPassword: jest.fn()}))
import RecoveryService from "../../api/services/recoveryService";

import ResetPassword from '../ResetPassword'

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('ResetPassword component', () => {
  beforeEach(async () => {
    jest.resetModules();
    jest.useFakeTimers();
    
    await RecoveryService.validateRecoveryId.mockImplementation(() => {
      return Promise.resolve();
    })
    await RecoveryService.resetPassword.mockImplementation(() => {
      return Promise.resolve();
    })
  });

  it("snapshot renders", () => {
    const history = createMemoryHistory()
    const location = { search: '?token=123' }
    const component = renderer.create(
      <Router history={history}>
        <ResetPassword location={location} />
      </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should have redirect links for login and create account", async () => {
    const location = { search: '?token=123' }
    const wrapper = shallow(
      <ResetPassword.WrappedComponent location={location} />
    );

    await flushPromises();
    wrapper.update();

    expect(wrapper.find('Link')).toHaveLength(2);
    expect(wrapper.find('Link').at(0).props().to).toBe('/signin');
    expect(wrapper.find('Link').at(1).props().to).toBe('/signup');
  });

  it("should have redirect links for login and create account", async () => {
    const location = { search: '?token=123' }
    const wrapper = shallow(
      <ResetPassword.WrappedComponent location={location} />
    );

    await flushPromises();
    wrapper.update();

    expect(wrapper.find('Link')).toHaveLength(2);
    expect(wrapper.find('Link').at(0).props().to).toBe('/signin');
    expect(wrapper.find('Link').at(1).props().to).toBe('/signup');
  });

  it("Should redirect to /signin after password successfully changed", async () => {
    const history = createMemoryHistory({
      initialEntries: ['/reset-password?token=123']
    });
    const wrapper = mount(
      <Router history={history}>
        <ResetPassword />
      </Router>
    );

    const mockedEvent = {
      target: {
        'password': {
          value: 'Password123'
        },
        'confirmPassword': {
          value: 'Password123'
        }
      },
      preventDefault: () => { },
      persist: () => { }
    }

    debugger
    expect(history.location.pathname).toBe("/reset-password")

    wrapper.find('ResetPassword').instance().changePassword(mockedEvent);
    await flushPromises();
    jest.runAllTimers();

    expect(history.location.pathname).toBe("/signin")
  })
});