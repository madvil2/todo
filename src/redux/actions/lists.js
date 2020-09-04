import { requestSigninSuccess } from "./users.js";
import createAxios from "../../utils/request.js";
import {
  ADD_LIST,
  REMOVE_LIST,
  CREATE_LIST_GROUP,
  FETCH_LIST_GROUP,
  FETCH_LIST_GROUP_SUCCESS,
  EDIT_LIST,
} from "../../constants";
import path from "../../utils/paths.js";
import { reverse } from "named-urls/src";

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

export const fetchGetListGroup = () => async (dispatch) => {
  await dispatch(fetchListGroup(true));
  try {
    const { data } = await createAxios().get(path.types);
    await dispatch(createListGroup(data.types));
    await dispatch(fetchListGroupSuccess());
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(requestSigninSuccess(false));
      localStorage.removeItem("token");
    }
  }
};

export const fetchAddList = (name, colorId) => async (dispatch) => {
  await dispatch(fetchListGroup(true));
  try {
    const { data } = await createAxios().post(path.types, { name, colorId });
    await dispatch(addList(data));
    await dispatch(fetchListGroupSuccess());
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(fetchListGroup(false));
      localStorage.removeItem("token");
    }
  }
};

export const fetchRemoveList = ({ id }) => async (dispatch) => {
  await dispatch(fetchListGroup(true));
  try {
    await createAxios().delete(reverse(path.typeId, { id }));
    await dispatch(removeList({ id }));
    await dispatch(fetchListGroupSuccess());
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(fetchListGroup(false));
      localStorage.removeItem("token");
    }
  }
};

export const fetchChangeList = (id, title) => async (dispatch) => {
  await dispatch(fetchListGroup(id));
  try {
    await createAxios().put(reverse(path.typeId, { id }), { name: title });
    await dispatch(editList(id, title));
    await dispatch(fetchListGroup(false));
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(fetchListGroup(false));
      localStorage.removeItem("token");
    }
  }
};
