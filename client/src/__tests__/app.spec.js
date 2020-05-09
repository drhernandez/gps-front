import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
const mockStore = configureStore([])

jest.mock('../api/services/authService', () => ({ verifyToken: jest.fn() }))
import AuthService from '../api/services/authService'

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

import App from '../App'
import { setUserInfoAction } from '../redux/actions/actions'
import getItems from '../data/sidebar-nav-items'
import Constants from '../utils/Constants'

let store;
describe('App component', () => {

  beforeEach(() => {
    jest.resetModules();
    store = mockStore({
      menuVisible: true,
      navItems: getItems()
    })
    store.dispatch = jest.fn()
  })

  it('should not call setUserAction if token is invalid', async () => {

    localStorage.setItem(Constants.LocalStorageKeys.ACCESS_TOKEN_KEY, 'token');
    await AuthService.verifyToken.mockImplementation(() => {
      return Promise.reject({});
    });

    await flushPromises()

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(store.dispatch).not.toHaveBeenCalled()
  })

  it('should call setUserAction and set info on store', async () => {
    debugger
    localStorage.setItem(Constants.LocalStorageKeys.ACCESS_TOKEN_KEY, 'token');
    await AuthService.verifyToken.mockImplementation(() => {
      return Promise.resolve({
        user: {
          id: 1,
          name: 'test',
          lastname: 'test',
          email: 'test@test.com'
        }
      });
    });

    mount(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await flushPromises()

    expect(store.dispatch).toHaveBeenCalled()
    expect(store.dispatch).toHaveBeenCalledWith(setUserInfoAction({
      id: 1,
      name: 'test',
      lastname: 'test',
      email: 'test@test.com'
    }))
  })
})