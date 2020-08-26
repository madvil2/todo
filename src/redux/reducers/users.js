import {
  REQUEST_ACTION,
  REQUEST_SIGNIN_SUCCESS,
  REQUEST_SIGNIN_FAILURE,
  REQUEST_SIGNUP_SUCCESS,
  REQUEST_SIGNUP_FAILURE,
  REQUEST_LOGOUT,
} from "../actions/users.js";

const initState = {
  status: "",
  success: false,
  loading: false,
  error: false,
  token: false,
};

export const users = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_ACTION:
      return {
        status: "",
        success: false,
        loading: action.payload,
        error: false,
        token: false,
      };
    case REQUEST_SIGNUP_SUCCESS:
      return {
        status: action.payload.status,
        success: action.payload.success,
        loading: false,
        error: false,
        token: false,
      };
    case REQUEST_SIGNUP_FAILURE:
      return {
        status: "User already exists",
        success: false,
        loading: false,
        error: true,
        token: false,
      };
    case REQUEST_SIGNIN_SUCCESS:
      return {
        status: "You logged in",
        success: action.payload.success,
        loading: false,
        error: false,
        token: action.payload.token,
      };
    case REQUEST_SIGNIN_FAILURE:
      return {
        status: "Wrong username or password",
        success: false,
        loading: false,
        error: true,
        token: false,
      };
    case REQUEST_LOGOUT:
      return {
        status: "",
        success: false,
        loading: false,
        error: false,
        token: false,
      };
    default:
      return state;
  }
};

export default users;
