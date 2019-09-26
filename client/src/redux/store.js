import { createStore } from 'redux';
import getSidebarNavItems from "../data/sidebar-nav-items";
import reducers from './reducers';

const initialState = {
  menuVisible: false,
  navItems: getSidebarNavItems()
}

const store = createStore(reducers);

export default store;