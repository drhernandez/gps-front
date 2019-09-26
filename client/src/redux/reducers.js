import { combineReducers } from 'redux'
import { types } from './actions';
import getSidebarNavItems from "../data/sidebar-nav-items";

const initialState = {
  menuVisible: false,
  navItems: getSidebarNavItems()
}

function menuVisible(state = initialState, action) {
  switch(action.type) {
    case types.TOGGLE_SIDEBAR: 
    // return Object.assign(...state, {
    //   menuVisible: !state.menuVisible
    // })
      return Object.assign({}, state, {
        menuVisible: !state.menuVisible
      });
    default:
      return state;
  }
}

const reducers = combineReducers({
  menuVisible
});

export default reducers;