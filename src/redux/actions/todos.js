import { ADD_TASK, ADD_LIST, REMOVE_LIST, SET_LIST } from "../../constants";

export const addTask = ({ listId, text, status, date }) => ({
  type: ADD_TASK,
  payload: { listId, text, status, date },
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
