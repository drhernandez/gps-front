import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import to from "await-to-js";
import Constants from "./utils/Constants";
import routes from "./routes";
import withTracker from "./withTracker";
import withAuth from "./withAuth";
import AuthService from "./api/services/authService";
import store from "./redux/store";
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
    const token = localStorage.getItem(Constants.LocalStorageKeys.ACCESS_TOKEN_KEY);
    const [err, userInfo] = await to(AuthService.verifyToken(token));
    if (!err && userInfo) {
      store.dispatch(setUserInfoAction(userInfo));
      this.setState({
        showSppiner: false
      })
    } else {
      console.log(err);
    }
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
                      withTracker(props => {
                        return (
                          <route.layout {...props}>
                            <route.component {...props} />
                          </route.layout>
                        );
                      }), route.isPublic
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

export default App;
