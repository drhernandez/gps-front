import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Login from "./views/Login"; 
import ForgotPassword from "./views/ForgotPassword";
import Register from "./views/Register";
import Home from "./views/Home";
import HeatMap from "./views/HeatMap";
import Alerts from "./views/Alerts";
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
  },
  {
    path: "/signin",
    layout: DefaultLayout,
    component: Login
  },
  {
    path: "/signup",
    layout: DefaultLayout,
    component: Register
  },
  {
    path: "/forgot-password",
    layout: DefaultLayout,
    component: ForgotPassword
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: Home
  },
  {
    path: "/heat-map",
    layout: DefaultLayout,
    component: HeatMap
  },
  {
    path: "/alerts",
    layout: DefaultLayout,
    component: Alerts
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  }
];
