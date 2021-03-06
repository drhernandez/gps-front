import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";

import { toogleSidebarAction } from "../../../redux/actions/actions";

class SidebarMainNavbar extends React.Component {
  render() {
    const { hideLogoText } = this.props.hideLogoText;
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px" }}
          >
            <div className="d-table m-auto">
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "25px" }}
                src={require("../../../images/logo.svg")}
                alt="Logo"
              />
              {!hideLogoText && (
                <span className="d-none d-md-inline ml-1">
                  S.G.S.
                </span>
              )}
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.props.toogleSidebarAction}
          >
            <i id="hoa" className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false
};

function mapDispatchToProps(dispatch) {
  return {
    toogleSidebarAction: () => dispatch(toogleSidebarAction())
  }
}

export default connect(null, mapDispatchToProps)(SidebarMainNavbar);
