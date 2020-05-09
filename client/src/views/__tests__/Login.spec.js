import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history'

jest.mock("../../api/services/authService", () => ({ login: jest.fn() }));
import AuthService from '../../api/services/authService';

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

import Login from '../Login'

it("snapshot renders", () => {
  const history = createMemoryHistory()
  const component = renderer.create(
    <Router history={history}>
      <Login />
    </Router>
  );
  
  expect(component.toJSON()).toMatchSnapshot();
})

it("Link Olvidaste tu contraseña should redirect to /forgot-password", () => {
  const wrapper = shallow(
    <Login.WrappedComponent />
  );
  
  expect(wrapper.find('Link').at(0).props().to).toBe('/forgot-password')
})

it("Should redirect to / after successful login", async () => {
  await AuthService.login.mockImplementation(() => {
    return Promise.resolve({
      user: {
        id: 1
      }
    });
  });
  
  const history = createMemoryHistory({
    initialEntries: ['/signin']
  });
  const wrapper = mount(
    <Router history={history}>
      <Login />
    </Router>
  );

  const mockedEvent = {
    target: {
      'email': {
        value: 'test@test.com'
      },
      'password': {
        value: 'password'
      }
    },
    preventDefault: () => { },
    persist: () => { }
  }

  expect(history.location.pathname).toBe("/signin")
  
  wrapper.find('Login').instance().login(mockedEvent);
  await flushPromises();

  expect(history.location.pathname).toBe("/")
})

it("Should show alert after invalid credentials", async () => {
  await AuthService.login.mockImplementation(() => {
    return Promise.reject(new Error('error'));
  });

  const history = createMemoryHistory({
    initialEntries: ['/signin']
  });
  const wrapper = mount(
    <Router history={history}>
      <Login />
    </Router>
  );

  const mockedEvent = {
    target: {
      'email': {
        value: 'test@test.com'
      },
      'password': {
        value: 'password'
      }
    },
    preventDefault: () => { },
    persist: () => { }
  }

  expect(history.location.pathname).toBe("/signin")
  expect(wrapper.find('Alert').props().open).toBe(false)

  wrapper.find('Login').instance().login(mockedEvent);
  await flushPromises();
  wrapper.update();

  expect(history.location.pathname).toBe("/signin")
  expect(wrapper.find('Alert').props().open).toBe(true)
})