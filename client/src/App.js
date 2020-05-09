import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import to from "await-to-js";
import Constants from "./utils/Constants";
import routes from "./routes";
import withAuth from "./withAuth";
import AuthService from "./api/services/authService";
import { connect } from "react-redux";
import { setUserInfoAction } from "./redux/actions/actions";

import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from 'react-bootstrap/Spinner'
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSppiner: true
    }
  }

  async componentDidMount() {
    debugger
    const token = localStorage.getItem(Constants.LocalStorageKeys.ACCESS_TOKEN_KEY);
    if (token) {
      const [err, tokenInfo] = await to(AuthService.verifyToken(token));
      if (!err && tokenInfo) {
        await this.props.setUserInfo(tokenInfo.user)
      }
    }

    this.setState({
      showSppiner: false
    });
  }

  render() {
    if (this.state.showSppiner) {

      return <Spinner style={{ position: "absolute", left: "50%", top: "30%", marginLeft: "-25px" }} animation="border" variant="primary" />

    } else {

      return (
        <Router basename={process.env.REACT_APP_BASENAME || ""}>
          <div>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={
                    withAuth(
                      props => {
                        return (
                          <route.layout {...props}>
                            <route.component {...props} />
                          </route.layout>
                        );
                      }, route
                    )
                  }
                />
              );
            })}
          </div>
        </Router>
      )
      
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserInfo: (payload) => dispatch(setUserInfoAction(payload))
  }
}

export default connect(null, mapDispatchToProps)(App);
