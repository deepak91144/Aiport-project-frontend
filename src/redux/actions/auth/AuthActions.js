import { UserSignin } from "../../../components/auth/ApiCalling";
import UserSignup from "../../../components/auth/ApiCalling";
import { AuthConstants } from "../../constants/auth/AuthConstants";

export const addUser = (userData) => {
  return async (dispatch) => {
    const response = await UserSignup(userData);
    dispatch({
      type: AuthConstants.ADD_USER,
      payload: {
        user: response,
        message: response.message,
        status: response.status,
      },
    });
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    const response = await UserSignin(user);
    dispatch({
      type: AuthConstants.LOGIN_USER,
      payload: {
        user: response,
        message: response.message,
        status: response.status,
      },
    });
  };
};
export const logout = () => {
  return { type: AuthConstants.LOGOUT };
};
