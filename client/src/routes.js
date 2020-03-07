import React from "react";
import {Redirect} from "react-router-dom";
// Layout Types
import {DefaultLayout, SimpleLayout} from "./layouts";
// Route Views
import Login from "./views/Login";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import Home from "./views/Home";
import HeatMap from "./views/HeatMap";
import Alerts from "./views/Alerts";
import Errors from "./views/Errors";
import UserProfileLite from "./views/UserProfileLite";
import NewClient from "./views/NewClient";
import ClientsAdmin from "./views/ClientsAdmin";
import store from "./redux/store";
import { removeUserInfoAction } from "./redux/actions/actions";
import { CLIENT, ADMIN } from "./utils/Roles";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    isPublic: true,
    component: (props) => {
      const state = store.getState();
      return state.userInfo != null && state.userInfo.role.name === ADMIN ? <Redirect to="/new-client" /> : <Redirect to="/home" />
    },
    roles: []
  },
  {
    path: "/signin",
    layout: SimpleLayout,
    isPublic: true,
    component: Login,
    roles: []
  },
  {
    path: "/logout",
    exact: true,
    layout: DefaultLayout,
    isPublic: true,
    component: (props) => {
      store.dispatch(removeUserInfoAction());
      return <Redirect to="/signin" />
    },
    roles: []
  },
  {
    path: "/forgot-password",
    layout: SimpleLayout,
    isPublic: true,
    component: ForgotPassword,
    roles: []
  },
  {
    path: "/reset-password/:recovery_id",
    layout: SimpleLayout,
    isPublic: true,
    component: ResetPassword,
    roles: []
  },
  {
    path: "/errors",
    layout: SimpleLayout,
    isPublic: true,
    component: Errors,
    roles: []
  },
  {
    path: "/home",
    layout: DefaultLayout,
    isPublic: false,
    component: Home,
    roles: [CLIENT]
  },
  {
    path: "/heat-map",
    layout: DefaultLayout,
    isPublic: false,
    component: HeatMap,
    roles: [CLIENT]
  },
  {
    path: "/alerts",
    layout: DefaultLayout,
    isPublic: false,
    component: Alerts,
    roles: [CLIENT]
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    isPublic: false,
    component: UserProfileLite,
    roles: [CLIENT, ADMIN]
  },
  {
    path: "/new-client",
    exact: true,
    layout: DefaultLayout,
    isPublic: false,
    component: NewClient,
    roles: [ADMIN]
  },
  {
    path: "/clients",
    exact: true,
    layout: DefaultLayout,
    isPublic: false,
    component: ClientsAdmin,
    roles: [ADMIN]
  }
];
