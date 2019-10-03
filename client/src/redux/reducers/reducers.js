import { combineReducers } from 'redux'
import { TOGGLE_SIDEBAR, SET_USER_INFO } from '../actions/types'
import getSidebarNavItems from "../../data/sidebar-nav-items";

const initialState = {
  menuVisible: false,
  navItems: getSidebarNavItems(),
  userInfo: null
}

// function menuVisible(state = initialState, action) {
//   switch(action.type) {
//     case TOGGLE_SIDEBAR: 
//     // return Object.assign(...state, {
//     //   menuVisible: !state.menuVisible
//     // })
//       return Object.assign({}, state, {
//         menuVisible: !state.menuVisible
//       });
//     default:
//       return state;
//   }
// }

function reducers(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      // return Object.assign(...state, {
      //   menuVisible: !state.menuVisible
      // })
      return Object.assign({}, state, {
        menuVisible: !state.menuVisible
      });
    case SET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.payload
      })
    default:
      return state;
  }
}

// const reducers = combineReducers({
//   // menuVisible
//   menuVisibleeeee: menuVisible
// });

export default reducers;