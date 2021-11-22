import { NavLink } from "react-router-dom";
import { signout } from "./auth/ApiCalling";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth/AuthActions";

const Menu = () => {
  // intiate useHistory object
  const history = useHistory();
  const dispatch = useDispatch();
  // function to logout a user
  const logOut = async () => {
    // calling signout function to signout a user
    dispatch(logout());

    signout();

    // redirect user to signin page after logout
    history.push("/signin");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink exact activeClassName="activeMenu" to="/dashboard">
          Home
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <NavLink
              exact
              activeClassName="activeMenu"
              to="/dashboard/airport"
              className="nav-link"
            >
              Airport
            </NavLink>

            <NavLink
              exact
              activeClassName="activeMenu"
              to="/dashboard/aircraft"
              className="nav-link"
            >
              Aircraft
            </NavLink>

            <NavLink
              exact
              activeClassName="activeMenu"
              to="/dashboard/transaction"
              className="nav-link"
            >
              Transaction
            </NavLink>

            <li className="nav-item text-center">
              <button className="btn btn-danger" onClick={logOut}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Menu;
