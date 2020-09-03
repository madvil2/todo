import axios from "axios";
import history from "../../utils/history.js";
import showError from "../../utils/showError";
import {
  REQUEST_SIGNUP_FAILURE,
  REQUEST_SIGNUP_SUCCESS,
  REQUEST_SIGNIN_SUCCESS,
  REQUEST_LOGOUT,
  REQUEST_ACTION,
  REQUEST_SIGNIN_FAILURE,
} from "../../constants.js";

export const requestSignupSuccess = (data) => {
  return {
    type: REQUEST_SIGNUP_SUCCESS,
    payload: data,
  };
};

export const requestSignupFailure = (err) => {
  return {
    type: REQUEST_SIGNUP_FAILURE,
    payload: err,
  };
};

export const requestSigninSuccess = (data) => {
  return {
    type: REQUEST_SIGNIN_SUCCESS,
    payload: data,
  };
};

export const requestLogOut = () => {
  return {
    type: REQUEST_LOGOUT,
  };
};

export const requestSigninFailure = (err) => {
  return {
    type: REQUEST_SIGNIN_FAILURE,
    payload: err,
  };
};

export const requestAction = (isLoading) => {
  return {
    type: REQUEST_ACTION,
    payload: isLoading,
  };
};

export const fetchSignupUser = (username, email, password) => async (
  dispatch
) => {
  await dispatch(requestAction(true));
  try {
    const { data } = await axios.post("/signup", { username, email, password });
    await dispatch(requestSignupSuccess(data));
    history.push("/login");
  } catch (err) {
    dispatch(requestSignupFailure(err));
    if (err.response.status === 400) {
      err.response.data.errors.map((err) => showError(err.msg));
    }
    if (err.response.status === 500) {
      showError(err.response.data.err.message);
    }
  }
};

export const fetchSigninUser = (username, password) => async (dispatch) => {
  await dispatch(requestAction(true));
  try {
    const { data } = await axios.post("/login", {
      username,
      password,
    });
    await dispatch(requestSigninSuccess(data));
    localStorage.setItem("token", data.token);
    history.push("/todo");
  } catch (err) {
    dispatch(requestSigninFailure(err));
    if (err.response.status === 401) {
      showError("Incorrect username or password");
    }
  }
};
