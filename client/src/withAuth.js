import React from "react";
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import Constants from "./utils/Constants";

const withAuth = (WrappedComponent, route) => {
  class HOC extends React.Component {
    
    constructor(props) {
      super(props)
      this.canAccess = this.__proto__.canAccess.bind(this)
    }

    canAccess(route) {
      return this.props.userInfo != null && route.roles.includes(this.props.userInfo.role.name);
    }
    
    render() {
      
      if (route.isPublic || this.canAccess(route)) {
        return <WrappedComponent {...this.props} />
      }

      localStorage.removeItem(Constants.LocalStorageKeys.ACCESS_TOKEN_KEY);
      return <Redirect to="/signin" />
    }
  };

  const mapStateToProps = state => {
    return { userInfo: state.userInfo };
  };

  return connect(mapStateToProps, null)(HOC);
}

export default withAuth;