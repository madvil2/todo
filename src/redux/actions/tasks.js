import { requestSigninSuccess } from "./users.js";
import createAxios from "../../utils/request.js";
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
import { useHistory } from "react-router-dom";

let history = useHistory();

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

export const fetchGetTaskList = () => (dispatch) => {
  dispatch(fetchTaskList(true));
  createAxios()
    .get("/todolist")
    .then((res) => {
      dispatch(createTaskList(res.data.tasks));
      dispatch(fetchTaskListSuccess());
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(requestSigninSuccess(false));
        localStorage.removeItem("token");
        history.push("/login");
      }
    });
};

export const fetchAddTaskSuccess = () => {
  return {
    type: FETCH_ADD_TASK_SUCCESS,
  };
};

export const fetchAddTask = ({ title, type, description, date, completed }) => (
  dispatch
) => {
  dispatch(fetchTaskList(true));
  createAxios()
    .post("/todolist", {
      title,
      type: type.toString(),
      description,
      date,
      completed,
    })
    .then((res) => {
      dispatch(addTask(res.data));
      dispatch(fetchTaskListSuccess());
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(requestSigninSuccess(false));
        localStorage.removeItem("token");
        history.push("/login");
      }
    });
};

export const fetchChangeTask = (id, title, date, completed) => (dispatch) => {
  dispatch(fetchTaskList(true));
  createAxios()
    .put(`/todolist/${id}`, {
      id,
      title,
      date,
      completed,
    })
    .then(() => {
      dispatch(editTask(id, title, date, completed));
      dispatch(fetchTaskListSuccess());
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(requestSigninSuccess(false));
        localStorage.removeItem("token");
        history.push("/login");
      }
    });
};

export const fetchDeleteTask = (id) => (dispatch) => {
  dispatch(fetchTaskList(true));
  createAxios()
    .delete(`/todolist/${id}`)
    .then(() => {
      dispatch(removeTask({ id }));
      dispatch(fetchTaskListSuccess());
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(requestSigninSuccess(false));
        localStorage.removeItem("token");
        history.push("/login");
      }
    });
};
