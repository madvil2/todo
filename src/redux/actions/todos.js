import {
  ADD_TASK,
  ADD_LIST,
  REMOVE_LIST,
  SET_LIST,
  REMOVE_TASK,
} from "../../constants";

export const addTask = ({ listId, text, status, date, taskId }) => ({
  type: ADD_TASK,
  payload: { listId, text, status, date, taskId },
});

export const removeTask = (data) => ({
  type: REMOVE_TASK,
  payload: data,
});

export const addList = ({ id, name, colorId }) => ({
  type: ADD_LIST,
  payload: { id, name, colorId },
});

export const removeList = ({ id }) => ({
  type: REMOVE_LIST,
  payload: { id },
});

export const setList = (list) => ({
  type: SET_LIST,
  payload: list,
});
