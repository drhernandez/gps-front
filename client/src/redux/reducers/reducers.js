import { combineReducers } from 'redux'
import { TOGGLE_SIDEBAR } from '../actions/types'
import getSidebarNavItems from "../../data/sidebar-nav-items";

const initialState = {
  menuVisible: false,
  navItems: getSidebarNavItems()
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
    default:
      return state;
  }
}

// const reducers = combineReducers({
//   // menuVisible
//   menuVisibleeeee: menuVisible
// });

export default reducers;