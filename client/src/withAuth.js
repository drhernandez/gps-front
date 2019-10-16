import React from "react";
import { Redirect } from "react-router-dom";
import store from "./redux/store";

const withAuth = (WrappedComponent, isPublic) => {
  
  const isLoggedIn = store.getState().userInfo != null;

  const HOC = class extends React.Component {
    
    render() {
      return isPublic || isLoggedIn ? <WrappedComponent {...this.props} /> : <Redirect to="/signin" />
    }
  };

  return HOC;
}

export default withAuth;