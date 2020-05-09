import React from "react";
import { connect } from 'react-redux'
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";

class SidebarNavItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navItems: []
    }
  }

  componentDidMount() {
    if (this.props.userInfo) {
      const navItems = this.props.navItems.filter(navItem => navItem.roles.includes(this.props.userInfo.role.name))
      this.setState({
        navItems: navItems
      })
    }
  }

  render() {
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {this.state.navItems.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { userInfo , navItems} = state
  return { 
    userInfo: userInfo,
    navItems: navItems
   };
};

export default connect(mapStateToProps, null)(SidebarNavItems);
