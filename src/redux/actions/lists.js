import { requestSigninSuccess } from "./users.js";
import createAxios from "../../utils/request.js";
import {
  ADD_LIST,
  REMOVE_LIST,
  CREATE_LIST_GROUP,
  CLEAR_LIST_GROUP,
  FETCH_LIST_GROUP,
  FETCH_LIST_GROUP_SUCCESS,
  EDIT_LIST,
} from "../../constants";

export function addList(list) {
  return {
    type: ADD_LIST,
    payload: list,
  };
}

export const editList = (id, title) => {
  return {
    type: EDIT_LIST,
    payload: {
      id: id,
      name: title,
    },
  };
};

export const removeList = ({ id }) => ({
  type: REMOVE_LIST,
  payload: { id },
});

export const createListGroup = (data) => {
  return {
    type: CREATE_LIST_GROUP,
    payload: data,
  };
};

export const clearListGroup = () => {
  return {
    type: CLEAR_LIST_GROUP,
  };
};

export const fetchListGroup = (isLoading) => {
  return {
    type: FETCH_LIST_GROUP,
    payload: isLoading,
  };
};

export const fetchListGroupSuccess = () => {
  return {
    type: FETCH_LIST_GROUP_SUCCESS,
  };
};

export const fetchGetListGroup = () => (dispatch) => {
  dispatch(fetchListGroup(true));
  createAxios()
    .get("/types")
    .then((res) => {
      dispatch(createListGroup(res.data.types));
      dispatch(fetchListGroupSuccess());
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(requestSigninSuccess(false));
        localStorage.removeItem("token");
      }
    });
};

export const fetchAddList = (name, colorId) => (dispatch) => {
  dispatch(fetchListGroup(true));
  createAxios()
    .post("/types", {
      name,
      colorId,
    })
    .then((res) => {
      dispatch(addList(res.data));
      dispatch(fetchListGroupSuccess());
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(fetchListGroup(false));
        localStorage.removeItem("token");
      }
    });
};

export const fetchRemoveList = ({ id }) => (dispatch) => {
  dispatch(fetchListGroup(true));
  createAxios()
    .delete(`/types/${id}`)
    .then(() => {
      dispatch(removeList({ id }));
      dispatch(fetchListGroupSuccess());
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(fetchListGroup(false));
        localStorage.removeItem("token");
      }
    });
};

export const fetchChangeList = (id, title) => (dispatch) => {
  dispatch(fetchListGroup(id));
  createAxios()
    .put(`/types/${id}`, {
      name: title,
    })
    .then((res) => {
      dispatch(editList(id, title));
      dispatch(fetchListGroup(false));
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(fetchListGroup(false));
        localStorage.removeItem("token");
      }
    });
};
