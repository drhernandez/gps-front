import React from "react";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import classNames from "classnames";
import {Col} from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarNavItems from "./SidebarNavItems";

class MainSidebar extends React.Component {

  render() {
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-12",
      this.props.menuVisible && "open"
    );

    return (
      <Col
        tag="aside"
        className={classes}
        lg={{ size: 2 }}
        md={{ size: 3 }}
      >
        <SidebarMainNavbar hideLogoText={this.props.hideLogoText} />
        <SidebarNavItems />
      </Col>
    );
  }
}

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

const mapStateToProps = state => {
  return { menuVisible: state.menuVisible };
};

export default connect(mapStateToProps, null)(MainSidebar);
