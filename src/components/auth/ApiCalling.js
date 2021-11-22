import { useDispatch } from "react-redux";

const UserSignup = (user) => {
  return fetch("http://localhost:8000/api/signup", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((data) => {
      return data.json();
    })
    .then((jsonResponse) => {
      return jsonResponse;
    })
    .catch((error) => {
      console.log(error);
    });
};

const UserSignin = (user) => {
  return fetch("http://localhost:8000/api/signin", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((data) => {
      return data.json();
    })
    .then((jsonResponse) => {
      return jsonResponse;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("airportJwt", JSON.stringify(data));
  }
};
const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("airportJwt")) {
    return JSON.parse(localStorage.getItem("airportJwt"));
  } else {
    return false;
  }
};
const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("airportJwt");

    return fetch(`http://localhost:8000/api/logout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("sigout successfull");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
export default UserSignup;
export { authenticate, isAuthenticated, signout, UserSignin };
