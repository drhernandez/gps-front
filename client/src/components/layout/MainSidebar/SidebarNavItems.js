import React from "react";
import { connect } from 'react-redux'
import store from "../../../redux/store";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";

const mapStateToProps = state => {
  return { navItems: state.navItems };
};

const getNavItems = (props) => {
  const state = store.getState();
  if (state.userInfo != null) {
    const userRole = state.userInfo.role.name;
    return props.navItems.filter(navItem => navItem.roles.includes(userRole));
  } else {
    return [];
  }
}

class SidebarNavItems extends React.Component {

  render() {
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {getNavItems(this.props).map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(SidebarNavItems);
