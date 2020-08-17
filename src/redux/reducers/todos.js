import {
  ADD_LIST,
  REMOVE_LIST,
  ADD_TASK,
  EDIT_LIST,
  REMOVE_TASK,
  EDIT_TASK,
} from "../../constants";
import { load, clear } from "redux-localstorage-simple";

// clear({
//   namespace: "todo",
// });
let Todos = load({ namespace: "todo" }).todos;
if (
  Todos === undefined ||
  !Object.keys(Todos).length ||
  !Todos.lists.length >= 8 ||
  !Todos.tasks.length >= 4
) {
  Todos = {
    tasks: [],
    lists: [],
    colors: [
      { id: "1", hex: "#C9D1D3", name: "grey" },
      { id: "2", hex: "#42B883", name: "green" },
      { id: "3", hex: "#64C4ED", name: "blue" },
      { id: "4", hex: "#FFBBCC", name: "pink" },
      { id: "5", hex: "#B6E6BD", name: "lime" },
      { id: "6", hex: "#C355F5", name: "purple" },
      { id: "7", hex: "#110133", name: "black" },
      { id: "8", hex: "#FF6464", name: "red" },
    ],
  };
}
export const todos = function reducer(state = Todos, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    case REMOVE_LIST:
      return {
        ...state,
        lists: state.lists.filter((val) => val.id !== action.payload.id),
        tasks: state.tasks.filter((val) => val.listId !== action.payload.id),
      };
    case EDIT_LIST:
      return {
        ...state,
        lists: action.payload,
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(
          (val) => val.taskId !== action.payload.taskId
        ),
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
