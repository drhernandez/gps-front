import React from "react";
import { withRouter } from "react-router-dom";
import queryString from 'query-string'

class ResetPassword extends React.Component {

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    console.log(values.token)
  }
  
  render() {
    return (
      <h1>GOLA</h1>
    );
  }
}

export default withRouter(ResetPassword);