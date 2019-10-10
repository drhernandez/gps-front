import React from "react";
import { connect } from 'react-redux'
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";

const mapStateToProps = state => {
  return { navItems: state.navItems };
};

class SidebarNavItems extends React.Component {

  render() {
    // const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {this.props.navItems.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(SidebarNavItems);
