import React from "react";
import { Route, Redirect } from "react-router-dom";
import withTracker from "../../withTracker";

export default class PrivateRoute extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true
    }
  }

  render() {
    return (
      this.state.isLoggedIn ?
        <Route
          key={this.props.index}
          path={this.props.route.path}
          exact={this.props.route.exact}
          component={withTracker(props => {
            return (
              <this.props.route.layout {...props}>
                <this.props.route.component {...props} />
              </this.props.route.layout>
            );
          })}
        />
      :
        <Redirect to="/signin" />
    )
  }
}


// const PrivateRoute = ({ index: index, route: route, isPublic: isPublic, ...props }) => (
//   <Route
//     key={index}
//     path={route.path}
//     exact={route.exact}
//     component={withTracker(props => {
//       return (
//         <route.layout {...props}>
//           <route.component {...props} />
//         </route.layout>
//       );
//     })}
//   />
// )

// export default PrivateRoute