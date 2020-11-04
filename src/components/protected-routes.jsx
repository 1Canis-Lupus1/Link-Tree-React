import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { isUserAuthenticated } from "../guards/auth-guard";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const data = useSelector(state => state)
  // console.log("useselectore",data.userData.token)
  return (
    <Route
      {...rest}
      render={props =>
        (data.userData.isActive) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: rest.redirectRoute, extras: {...rest.location}}} />
        )
      }
    />
  );
};

export default ProtectedRoute;
