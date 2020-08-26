import { combineReducers } from "redux";

import { todos } from "./todos";
import { users } from "./users";

export const rootReducer = combineReducers({ todos: todos, users: users });
