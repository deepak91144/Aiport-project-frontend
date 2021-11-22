import { useState, useEffect } from "react";
import UserSignup, { authenticate, isAuthenticated } from "./ApiCalling";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, logout } from "../../redux/actions/auth/AuthActions";

const Signup = () => {
  const [showError, setShowError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const AuthReducer = useSelector((state) => state.AuthReducer);
  if (AuthReducer.status === "ok") {
    authenticate(AuthReducer.user);
  }
  useEffect(() => {
    isAuthenticated() && history.push("/dashboard");
  });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((preVal) => {
      return { ...preVal, [name]: value };
    });
  };
  const signupUser = (event) => {
    event.preventDefault();
    dispatch(addUser(data));
    // UserSignup(data).then((res) => {
    //   if (res.status === "ok") {
    //     res.message = null;
    //     res.status = null;
    //     console.log(res);
    // authenticate(res);
    //   }
    //   if (res.status === "error") {
    //     setShowError(res.message);
    //   }
    // });
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-form">
          <form
            action="/examples/actions/confirmation.php"
            method="post"
            onSubmit={signupUser}
          >
            <h2>Sign Up</h2>

            <hr />
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <span className="fa fa-user"></span>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Username"
                  required="required"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-paper-plane"></i>
                  </span>
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
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
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
                Sign Up
              </button>
              <div className="text-danger text-center mt-3">
                {AuthReducer.apiCalling === "signup" && AuthReducer.message}
              </div>

              {/* <div className="text-danger mt-3">{showError}</div> */}
            </div>
          </form>
          <div
            className="text-center text-dark"
            style={{ fontWeight: "bolder" }}
          >
            Already have an account?
            <NavLink
              to="/signin"
              className="text-white"
              style={{ marginLeft: "10px" }}
            >
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
