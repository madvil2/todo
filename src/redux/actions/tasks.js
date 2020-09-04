import { requestSigninSuccess } from "./users.js";
import createAxios from "../../utils/request.js";
import path from "../../utils/paths.js";
import { reverse } from "named-urls/src";

import {
  ADD_TASK,
  CREATE_TASK_LIST,
  EDIT_TASK,
  DELETE_GROUP_TASKS,
  FETCH_TASK_LIST,
  REMOVE_TASK,
  FETCH_TASK_ITEM,
  FETCH_TASK_LIST_SUCCESS,
  FETCH_ADD_TASK_SUCCESS,
  SORT_TASKS,
} from "../../constants";

export const sortTasks = (sort) => {
  return {
    type: SORT_TASKS,
    payload: sort.value,
  };
};

export const addTask = (res) => {
  return {
    type: ADD_TASK,
    payload: {
      type: res.type,
      title: res.title,
      status: res.completed,
      date: res.date,
      id: res.id,
    },
  };
};

export const createTaskList = (data) => {
  return {
    type: CREATE_TASK_LIST,
    payload: data,
  };
};

export const editTask = (id, title, date, completed) => {
  return {
    type: EDIT_TASK,
    payload: {
      id: id,
      title: title,
      date: date,
      completed: completed,
    },
  };
};

export const deleteTaskInGroup = (group) => {
  return {
    type: DELETE_GROUP_TASKS,
    payload: group,
  };
};

export const removeTask = ({ id }) => ({
  type: REMOVE_TASK,
  payload: { id },
});

export const fetchTaskList = (isLoading) => {
  return {
    type: FETCH_TASK_LIST,
    payload: isLoading,
  };
};

export const fetchTask = (loadingItem) => {
  return {
    type: FETCH_TASK_ITEM,
    payload: loadingItem,
  };
};

export const fetchTaskListSuccess = () => {
  return {
    type: FETCH_TASK_LIST_SUCCESS,
  };
};

export const fetchAddTaskSuccess = () => {
  return {
    type: FETCH_ADD_TASK_SUCCESS,
  };
};

export const fetchGetTaskList = () => async (dispatch) => {
  await dispatch(fetchTaskList(true));
  try {
    const { data } = await createAxios().get(path.todolist);
    await dispatch(createTaskList(data.tasks));
    await dispatch(fetchTaskListSuccess());
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(requestSigninSuccess(false));
      localStorage.removeItem("token");
    }
  }
};

export const fetchAddTask = ({
  title,
  type,
  description,
  date,
  completed,
}) => async (dispatch) => {
  await dispatch(fetchTaskList(true));
  try {
    await dispatch(fetchTaskList(true));
    const { data } = await createAxios().post(path.todolist, {
      title,
      type: type.toString(),
      description,
      date,
      completed,
    });
    await dispatch(addTask(data));
    await dispatch(fetchTaskListSuccess());
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(requestSigninSuccess(false));
      localStorage.removeItem("token");
    }
  }
};

export const fetchChangeTask = (id, title, date, completed) => async (
  dispatch
) => {
  await dispatch(fetchTaskList(true));
  try {
    await createAxios().put(reverse(path.todoId, { id }), {
      id,
      title,
      date,
      completed,
    });
    await dispatch(editTask(id, title, date, completed));
    await dispatch(fetchTaskListSuccess());
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(requestSigninSuccess(false));
      localStorage.removeItem("token");
    }
  }
};

export const fetchDeleteTask = (id) => async (dispatch) => {
  await dispatch(fetchTaskList(true));
  try {
    await createAxios().delete(reverse(path.todoId, { id }));
    await dispatch(removeTask({ id }));
    await dispatch(fetchTaskListSuccess());
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(requestSigninSuccess(false));
      localStorage.removeItem("token");
    }
  }
};
