import React, { Component, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { logout } from "../redux/actions/auth/AuthActions";
import { isAuthenticated } from "./auth/ApiCalling";

// wrapper components that conatins all the private component that should not be accessed by the one who is not a legit user
const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated()) {
    } else {
      dispatch(logout());
    }
  });
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
