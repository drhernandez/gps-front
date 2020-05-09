import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { Router } from "react-router-dom"
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
const mockStore = configureStore([])

import { toogleSidebarAction } from "../../../redux/actions/actions"
import MainNavbar from '../../layout/MainNavbar/MainNavbar'
import NavbarToggle from '../../layout/MainNavbar/NavbarToggle'
import NavbarNav from '../../layout/MainNavbar/NavbarNav/NavbarNav'
import UserActions from '../../layout/MainNavbar/NavbarNav/UserActions'

let history
let store
describe('MainNavbar components', () => {
  beforeEach(() => {
    jest.resetModules()
    history = createMemoryHistory()
    store = mockStore({
      userInfo: {
        id: 1,
        name: 'test',
        lastName: 'test'
      },
    })
    store.dispatch = jest.fn()
  })

  it('MainNavbar snapshot', () => {
    const component = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <MainNavbar />
        </Provider>
      </Router>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('NavbarToggle snapshot', () => {
    const component = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <NavbarToggle />
        </Provider>
      </Router>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('NavbarToggle should dispatch toogleSidebarAction', () => {
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <NavbarToggle />
        </Provider>
      </Router>
    )

    wrapper.find('a').simulate('click')

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(toogleSidebarAction());
  })

  it('NavbarNav snapshot', () => {
    const component = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <NavbarNav />
        </Provider>
      </Router>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('UserActions snapshot', () => {
    const component = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <UserActions />
        </Provider>
      </Router>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})