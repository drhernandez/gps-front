import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {
        return (
          route.isPublic ? //SI ES UNA RUTA PÚBLICA...
            <Route // CARGÁ ESTO
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          : // SINO...
            <PrivateRoute id="private" // CARGÁ ESTO
              key={index}
              index={index}
              route={route}
            />
        );
      })}
    </div>
  </Router>
);
