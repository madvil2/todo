import { combineReducers } from "redux";

import { todos, fetchTasksReducer, fetchListsReducer } from "./todos";
import { users } from "./users";

export const rootReducer = combineReducers({
  todos: todos,
  users: users,
  fetchTasks: fetchTasksReducer,
  fetchLists: fetchListsReducer,
});
