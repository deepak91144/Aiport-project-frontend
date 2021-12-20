import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { loginUser, logout } from "../../redux/actions/auth/AuthActions";

import { authenticate, isAuthenticated, UserSignin } from "./ApiCalling";

const Signin = () => {
  // state variable for showing error message
  const [showErr, setShowErr] = useState("");
  const dispatch = useDispatch();
  const AuthReducer = useSelector((state) => state.AuthReducer);
  if (AuthReducer.status === "ok") {
    authenticate(AuthReducer.user);
    // if the user already signed in send him to dashboard page
  }
  // useEffect hook that runs after each render of components
  useEffect(() => {
    isAuthenticated() && history.push("/dashboard");
  });
  // initiate useHistory hook
  const history = useHistory();
  // state that holds initial data of input box for email and password
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // function that handle change event of email and password input box
  const handleChange = (event) => {
    // destructure name and value of respective input box
    const { name, value } = event.target;
    // storing the values to the respective state
    setData((preVal) => {
      return { ...preVal, [name]: value };
    });
  };
  // function to signin a user
  const signinUser = async (event) => {
    // prevent the page being refreshed
    event.preventDefault();
    // calling the API for signin
    // const response = await UserSignin(data);
    dispatch(loginUser(data));
    // after successfull signin do following things
    // if (response.status === "ok") {
    //   response.status = null;
    //   response.message = null;
    //   // make blank to the showError state
    //   setShowErr("");
    //   // function to authenticate an user
    //   authenticate(response);
    //   // after authenticate , redirect the user to dashboard
    //   history.push("/dashboard");
    // }
    // // if some error occured, do the following things
    // if (response.status === "error") {
    //   // set error message to the respective state
    //   setShowErr(response.message);
    // }
  };

  return (
    <>
      <div className="signin-container">
        <div className="signup-form">
          <form
            action="/examples/actions/confirmation.php"
            method="post"
            onSubmit={signinUser}
          >
            <h2>Sign IN</h2>

            <hr />

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  {/* <span className="input-group-text">
                    <i className="fa fa-paper-plane"></i>
                  </span> */}
                </div>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  required="required"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  {/* <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span> */}
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required="required"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend"></div>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg">
                Sign In
              </button>
              <div className="text-danger mt-3 text-center">
                {AuthReducer.apiCalling === "signin" && AuthReducer.message}
              </div>
              {/* <div className="text-danger mt-3">{showErr}</div> */}
            </div>
          </form>
          <div className="text-center" style={{ fontWeight: "bolder" }}>
            Dont have have an account?
            <NavLink
              style={{ marginLeft: "10px" }}
              className="text-white ml-5"
              to="/"
            >
              Signup Here
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signin;
