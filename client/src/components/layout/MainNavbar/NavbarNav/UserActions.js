import React from "react";
import { Link } from "react-router-dom";
import store from "../../../../redux/store";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

import AuthService from "../../../../api/services/authService";


export default class UserActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userInfo: undefined
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  componentDidMount() {
    const state = store.getState();
    this.setState({
      userInfo: state.userInfo
    })
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  logout() {
    AuthService.logout();
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="d-flex align-items-center h-100 text-nowrap px-3">
          <span className="d-none d-inline-block">{this.state.userInfo && this.state.userInfo.userName + " " + this.state.userInfo.userLastName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} onClick={() => this.logout()} to="/" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
