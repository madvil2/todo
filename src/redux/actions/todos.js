import { ADD_TASK, ADD_LIST } from "../../constants";

export const addList = ({ id, name, colorId }) => ({
  type: ADD_LIST,
  payload: { id, name, colorId },
});
