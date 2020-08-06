import { ADD_TASK, ADD_LIST, REMOVE_LIST } from "../../constants";

export const addTask = ({ listId, text, status }) => ({
  type: ADD_TASK,
  payload: { listId, text, status },
});

export const addList = ({ id, name, colorId }) => ({
  type: ADD_LIST,
  payload: { id, name, colorId },
});

export const removeList = ({ id }) => ({
  type: REMOVE_LIST,
  payload: { id },
});
