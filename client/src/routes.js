import React from "react";
import {Redirect} from "react-router-dom";
// Layout Types
import {DefaultLayout, SimpleLayout} from "./layouts";
// Route Views
import Login from "./views/Login";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import Register from "./views/Register";
import Home from "./views/Home";
import HeatMap from "./views/HeatMap";
import Alerts from "./views/Alerts";
import Errors from "./views/Errors";
import UserProfileLite from "./views/UserProfileLite"

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    isPublic: true,
    component: () => <Redirect to="/signin" />
  },
  {
    path: "/signin",
    layout: SimpleLayout,
    isPublic: true,
    component: Login
  },
  {
    path: "/signup",
    layout: SimpleLayout,
    isPublic: true,
    component: Register
  },
  {
    path: "/forgot-password",
    layout: SimpleLayout,
    isPublic: true,
    component: ForgotPassword
  },
  {
    path: "/reset-password/:recovery_id",
    layout: SimpleLayout,
    isPublic: true,
    component: ResetPassword
  },
  {
    path: "/errors",
    layout: SimpleLayout,
    isPublic: true,
    component: Errors
  },
  {
    path: "/home",
    layout: DefaultLayout,
    isPublic: false,
    component: Home
  },
  {
    path: "/heat-map",
    layout: DefaultLayout,
    isPublic: false,
    component: HeatMap
  },
  {
    path: "/alerts",
    layout: DefaultLayout,
    isPublic: false,
    component: Alerts
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    isPublic: false,
    component: UserProfileLite
  }
];
