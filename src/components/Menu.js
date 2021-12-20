import { NavLink } from "react-router-dom";
import { isAuthenticated, signout } from "./auth/ApiCalling";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth/AuthActions";
import avatar from "./user.png";

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
      <nav className="navbar navbar-expand-lg navbar-dark  fixed-top headerNav">
        <a className="navbar-brand" href="#">
          Fuel Transaction System
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul class=" mr-auto   d-flex flex-row-reverse w-100 ">
          <li
            class="nav-item dropdown userDropdown"
            style={{ display: "none" }}
          >
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={avatar} width="50px" height="50px" />
            </a>
            <div
              class="dropdown-menu dropdown-menu-end  bg-white text-center mr-5"
              aria-labelledby="navbarDropdown"
            >
              <h3 className="text-primary">{isAuthenticated().user.name}</h3>
              <button className="btn btn-danger" onClick={logOut}>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      <div
        className="offcanvas offcanvas-start sidebarNav "
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header d-flex flex-row-reverse w-100">
          <button
            type="button"
            className="btn-close text-reset "
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          <div className="d-flex justify-content-center w-100">
            <img
              className="flex-center"
              src={avatar}
              width="50px"
              height="50px"
            />
          </div>
        </div>

        <div className="offcanvas-body">
          <nav className="navbar-dark sidebarMenu">
            <ul className="navbar-nav mr-auto  text-primary">
              <li className="text-primary">
                <NavLink
                  exact
                  activeClassName="activeMenu text-success"
                  to="/dashboard"
                >
                  <span>
                    <i className="fas fa-tachometer "></i>
                  </span>
                  <span> Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeClassName="activeMenu"
                  to="/dashboard/airport"
                  className="nav-link"
                >
                  <span>
                    <i class="fas fa-fighter-jet "></i>
                  </span>
                  <span> Airport</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeClassName="activeMenu"
                  to="/dashboard/aircraft"
                  className="nav-link"
                >
                  <span>
                    <i class="fas fa-fighter-jet "></i>
                  </span>
                  <span> Aircraft</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeClassName="activeMenu"
                  to="/dashboard/transaction"
                  className="nav-link"
                >
                  <span>
                    <i class="fas fa-gas-pump "></i>
                  </span>
                  <span> Fuel Transaction</span>
                </NavLink>
              </li>

              <li className="nav-item text-center">
                <button
                  className="btn btn-danger desktopViewLogout"
                  onClick={logOut}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Menu;
