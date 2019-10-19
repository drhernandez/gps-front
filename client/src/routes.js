import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { SimpleLayout, DefaultLayout } from "./layouts";

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
    path: "/errors",
    layout: SimpleLayout,
    isPublic: true,
    component: Errors
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    isPublic: false,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    isPublic: false,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    isPublic: false,
    component: AddNewPost
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    isPublic: false,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    isPublic: false,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    isPublic: false,
    component: BlogPosts
  }
];
