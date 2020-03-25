import {SET_USER_INFO, TOGGLE_SIDEBAR, REMOVE_USER_INFO} from '../actions/types'
import getSidebarNavItems from "../../data/sidebar-nav-items";

const initialState = {
  menuVisible: false,
  navItems: getSidebarNavItems(),
  userInfo: null
}

function reducers(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        menuVisible: !state.menuVisible
      });
    case SET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.payload
      });
    case REMOVE_USER_INFO:
      delete state.userInfo;
      return Object.assign({}, state);
    default:
      return state;
  }
}

// const reducers = combineReducers({
//   // menuVisible
//   menuVisibleeeee: menuVisible
// });

export default reducers;
