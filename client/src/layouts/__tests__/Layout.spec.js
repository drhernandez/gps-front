import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux';
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history'
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

import Default from "../Default"
import Simple from "../Simple"
import getItems from '../../data/sidebar-nav-items'

let store;

describe("Layouts", () => {

  beforeEach(async () => {
    store = mockStore({
      menuVisible: true,
      navItems: getItems(),
      userInfo: {
        id: 1,
        role: {
          name: 'ADMIN'
        }
      }
    });
  });

  it("Simple snapshot", () => {
    const component = renderer.create(
      <Simple />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it("Default snapshot", () => {
    const history = createMemoryHistory()
    const component = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <Default />
        </Provider>
      </Router>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})