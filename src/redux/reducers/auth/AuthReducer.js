import { AuthConstants } from "../../constants/auth/AuthConstants";

const initialState = {
  user: "",
  message: "",
  status: "",
  apiCalling: "",
};
export const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthConstants.ADD_USER:
      return {
        ...state,
        user: payload.user,
        message: payload.message,
        status: payload.status,
        apiCalling: "signup",
      };

    case AuthConstants.LOGIN_USER:
      return {
        ...state,
        user: payload.user,
        message: payload.message,
        status: payload.status,
        apiCalling: "signin",
      };

    case AuthConstants.LOGOUT:
      return { user: "", message: "", status: "" };
    default:
      return state;
  }
};
