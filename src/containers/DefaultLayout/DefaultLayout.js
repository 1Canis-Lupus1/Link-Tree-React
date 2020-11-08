import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
import ProtectedRoute from "../../components/protected-routes";
import ProfilePreview from "./../../pages/profile-preview-page";
import Links from "./../../pages/links-page";
import Appearance from "./../../pages/appearance-page";
import { toast, toasts } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  loggingOut = () => {
    toast.success("User Logged-Out Successfully", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    // alert("Logged Out");
  };

  signOut(e) {
    e.preventDefault();
    console.log("On Sign out", e.target);
    localStorage.clear();
    //Clear Store here for Logout
    this.props.history.push("/login");
  }

  componentDidMount() {
    console.log("In Default Layout ");
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              onLogout={(e) => {
                alert("Logout Successful");
                this.signOut(e);
              }}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <Container fluid>
            </Container> */}
            <Switch>
              <ProtectedRoute
                path={`/profile-preview`}
                component={ProfilePreview}
                redirectRoute={"/login"}
              />
              <ProtectedRoute
                path={`/links`}
                component={Links}
                redirectRoute={"/login"}
              />
              <ProtectedRoute
                path={`/appearance`}
                component={Appearance}
                redirectRoute={"/login"}
              />
              <Route path="/" render={() => <Redirect to="/links" />} />
            </Switch>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
