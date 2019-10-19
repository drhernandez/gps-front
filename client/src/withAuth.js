import React from "react";
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

const withAuth = (WrappedComponent, isPublic) => {
  
  const mapStateToProps = state => {
    return { userInfo: state.userInfo };
  };

  const HOC = class extends React.Component {
    
    render() {
      return isPublic || this.props.userInfo ? <WrappedComponent {...this.props} /> : <Redirect to="/signin" />
    }
  };

  return connect(mapStateToProps, null)(HOC);
}

export default withAuth;