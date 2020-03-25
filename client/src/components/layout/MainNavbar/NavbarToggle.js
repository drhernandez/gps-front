import React from "react";
import { connect } from 'react-redux'
import { toogleSidebarAction } from "../../../redux/actions/actions";

function mapDispatchToProps(dispatch) {
  return {
    toogleSidebarAction: () => dispatch(toogleSidebarAction())
  }
}

class NavbarToggle extends React.Component {

  render() {
    return (
      <nav className="nav">
        {/* eslint-disable-next-line */}
        <a href="#" onClick={this.props.toogleSidebarAction} className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center">
          <i className="material-icons">&#xE5D2;</i>
        </a>
      </nav>
    )
  }
}

export default connect(null, mapDispatchToProps)(NavbarToggle);
