import React from 'react'
import withAuth from '../withAuth'
import { mount } from 'enzyme'
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('withAuth HOC', () => {

  it('should render public route', async () => {

    const route = {
      isPublic: true
    }

    const Component = withAuth(
      props => {
        return (
          <h1>TEST</h1>
        );
      }, route
    )

    const history = createMemoryHistory({ initialEntries: ['/'] })
    const store = mockStore({})
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <Component />
        </Provider>
      </Router>
    )

    expect(wrapper.find('Redirect')).toHaveLength(0)
    expect(wrapper.find('h1').text()).toBe('TEST')
  })

  it('should redirect to /signin when route is not public and user is not logged in', async () => {

    const route = {
      isPublic: false,
      roles: ['ADMIN']
    }

    const Component = withAuth(
      props => {
        return (
          <h1>TEST</h1>
        );
      }, route
    )

    const history = createMemoryHistory({ initialEntries: ['/'] })
    expect(history.location.pathname).toBe('/')

    const store = mockStore({})
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <Component />
        </Provider>
      </Router>
    )
    
    expect(history.location.pathname).toBe('/signin')
    expect(wrapper.find('Redirect')).toHaveLength(1)
    expect(wrapper.find('Redirect').props().to).toBe('/signin')
  })

  it('should render component when route is not public and user is logged in', async () => {

    const route = {
      isPublic: false,
      roles: ['ADMIN']
    }

    const Component = withAuth(
      props => {
        return (
          <h1>TEST</h1>
        );
      }, route
    )

    const history = createMemoryHistory({ initialEntries: ['/'] })
    const store = mockStore({
      userInfo: {
        userId: 1,
        role: {
          name: 'ADMIN'
        }
      }
    })
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <Component />
        </Provider>
      </Router>
    )

    expect(wrapper.find('Redirect')).toHaveLength(0)
    expect(wrapper.find('h1').text()).toBe('TEST')
  })
});