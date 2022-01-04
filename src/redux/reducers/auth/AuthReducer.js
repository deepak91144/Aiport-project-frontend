import { AuthConstants } from "../../constants/auth/AuthConstants";

const initialState = {
  user: "",
  message: "",
  status: "",
  apiCalling: "",
  invalidToken: false,
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
        invalidToken: false,
      };

    case AuthConstants.LOGIN_USER:
      return {
        ...state,
        user: payload.user,
        message: payload.message,
        status: payload.status,
        apiCalling: "signin",
        invalidToken: false,
      };

    case AuthConstants.LOGOUT:
      return { user: "", message: "", status: "", invalidToken: false };
    case AuthConstants.INVALID_TOKEN:
      return { user: "", message: "", status: "", invalidToken: true };
    default:
      return state;
  }
};
