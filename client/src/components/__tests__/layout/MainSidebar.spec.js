import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { Router } from "react-router-dom"
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
const mockStore = configureStore([])

import { toogleSidebarAction } from "../../../redux/actions/actions"
import MainSidebar from '../../layout/MainSidebar/MainSidebar'
import SidebarMainNavbar from '../../layout/MainSidebar/SidebarMainNavbar'
import SidebarNavItem from '../../layout/MainSidebar/SidebarNavItem'
import SidebarNavItems from '../../layout/MainSidebar/SidebarNavItems'
import getItems from '../../../data/sidebar-nav-items'

let history
let store
describe('MainSidebar components', () => {
  beforeEach(() => {
    jest.resetModules()
    history = createMemoryHistory()
    store = mockStore({
      menuVisible: true,
      navItems: getItems(),
      userInfo: {
        role: {
          name: 'ADMIN'
        }
      }
    })
    store.dispatch = jest.fn()
  })

  it('MainSidebar snapshot', () => {
    const component = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <MainSidebar />
        </Provider>
      </Router>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('SidebarMainNavbar snapshot', () => {
    const component = renderer.create(
        <Provider store={store}>
          <SidebarMainNavbar />
        </Provider>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('SidebarMainNavbar should dispatch toogleSidebarAction', () => {
    const wrapper = mount(
        <Provider store={store}>
          <SidebarMainNavbar />
        </Provider>
    )

    wrapper.find('a').at(1).simulate('click')

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(toogleSidebarAction());
  })

  it('SidebarNavItem snapshot', () => {
    const props = {
      item: {
        title: "Mi ubicación",
        to: "/home",
        htmlBefore: '<i class="material-icons">my_location</i>',
        htmlAfter: ""
      }
    }

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <SidebarNavItem {...props} />
        </Router>
      </Provider>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('SidebarNavItems snapshot', () => {
    const component = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <SidebarNavItems />
        </Provider>
      </Router>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('SidebarNavItems should have 3 nav items', () => {
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <SidebarNavItems />
        </Provider>
      </Router>
    )

    expect(wrapper.find('SidebarNavItem')).toHaveLength(3)
  })
})