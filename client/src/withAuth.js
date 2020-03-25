import React from "react";
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import Constants from "./utils/Constants";
import store from "./redux/store";

const withAuth = (WrappedComponent, route) => {
  
  const mapStateToProps = state => {
    return { userInfo: state.userInfo };
  };

  const canAccess = (route) => {
    const state = store.getState();
    return state.userInfo !== null && route.roles.includes(state.userInfo.role.name);
  }

  const HOC = class extends React.Component {
    
    render() {
      
      if (route.isPublic || canAccess(route)) {
        return <WrappedComponent {...this.props} />
      }

      localStorage.removeItem(Constants.LocalStorageKeys.ACCESS_TOKEN_KEY);
      return <Redirect to="/signin" />
    }
  };

  return connect(mapStateToProps, null)(HOC);
}

export default withAuth;