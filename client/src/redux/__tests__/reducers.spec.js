import { toogleSidebarAction, setUserInfoAction, removeUserInfoAction } from "../actions/actions";
import { TOGGLE_SIDEBAR, SET_USER_INFO, REMOVE_USER_INFO } from "../actions/types";
import reducers from "../reducers/reducers";

let initialState;
describe('Redux reducers', () => {

  beforeEach(() => {
     initialState = {
      menuVisible: false,
      navItems: [],
      userInfo: null
    }
  })

  it('should return the initial state', () => {
    expect(reducers(initialState, 'invalid action')).toEqual(initialState);
  })

  it('should toogle menuVisible prop', () => {
    const expectedState = {
      menuVisible: true,
      navItems: [],
      userInfo: null
    }
    expect(reducers(initialState, toogleSidebarAction())).toEqual(expectedState);
  })

  it('should ser user info on store', () => {
    const userInfo = {
      id: 1,
      name: 'test'
    };
    const expectedState = {
      menuVisible: false,
      navItems: [],
      userInfo: userInfo
    }
    expect(reducers(initialState, setUserInfoAction(userInfo))).toEqual(expectedState);
  })

  it('should remove user info from store', () => {
    const expectedState = {
      menuVisible: false,
      navItems: []
    }
    expect(reducers(initialState, removeUserInfoAction())).toEqual(expectedState);
  })
})