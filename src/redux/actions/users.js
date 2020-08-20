import axios from "axios";

export const REQUEST_ACTION = "REQUEST_ACTION";
export const REQUEST_SIGNUP_SUCCESS = "REQUEST_SIGNUP_SUCCESS";
export const REQUEST_SIGNUP_FAILURE = "REQUEST_SIGNUP_FAILURE";
export const REQUEST_SIGNIN_SUCCESS = "REQUEST_SIGNIN_SUCCESS";
export const REQUEST_SIGNIN_FAILURE = "REQUEST_SIGNIN_FAILURE";

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

export const fetchSignupUser = (username, mail, password) => (dispatch) => {
  dispatch(requestAction(true));
  axios
    .post("/signup", {
      username: username,
      email: mail,
      password: password,
    })
    .then(({ data }) => {
      dispatch(requestSignupSuccess(data));
    })
    .catch((err) => {
      dispatch(requestSignupFailure(err));
    });
};

export const fetchSigninUser = (username, password) => (dispatch) => {
  dispatch(requestAction(true));
  axios
    .post("/login", { username: username, password: password })
    .then(({ data }) => {
      dispatch(requestSigninSuccess(data));
      localStorage.setItem("token", data.token);
    })
    .catch((err) => {
      dispatch(requestSigninFailure(err));
    });
};
