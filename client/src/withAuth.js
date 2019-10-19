import React from "react";
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
// import store from "./redux/store";

const withAuth = (WrappedComponent, isPublic) => {
  
  // const isLoggedIn = store.getState().userInfo != null;
  
  const mapStateToProps = state => {
    return { userInfo: state.userInfo };
  };

  const HOC = class extends React.Component {
    
    render() {
      return isPublic || this.props.userInfo ? <WrappedComponent {...this.props} /> : <Redirect to="/signin" />
    }
  };

  return connect(mapStateToProps, null)(HOC);
  // return HOC;
}

export default withAuth;