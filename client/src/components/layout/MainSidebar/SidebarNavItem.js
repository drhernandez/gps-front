import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";

import { toogleSidebarAction } from "../../../redux/actions/actions";

const SidebarNavItem = (props) => (
  <NavItem>
    <NavLink tag={RouteNavLink} to={props.item.to} onClick={props.toogleSidebarAction}>
      {props.item.htmlBefore && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: props.item.htmlBefore }}
        />
      )}
      {props.item.title && <span>{props.item.title}</span>}
      {props.item.htmlAfter && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: props.item.htmlAfter }}
        />
      )}
    </NavLink>
  </NavItem>
);

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    toogleSidebarAction: () => dispatch(toogleSidebarAction())
  }
}

export default connect(null, mapDispatchToProps)(SidebarNavItem);
