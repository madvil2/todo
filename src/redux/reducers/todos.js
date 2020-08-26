import {
  ADD_LIST,
  REMOVE_LIST,
  ADD_TASK,
  REMOVE_TASK,
  EDIT_LIST,
  EDIT_TASK,
  CREATE_TASK_LIST,
  CREATE_LIST_GROUP,
} from "../../constants";

const initState = {
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
export const todos = function reducer(state = initState, action) {
  switch (action.type) {
    case CREATE_TASK_LIST:
      return {
        ...state,
        tasks: [...action.payload],
      };
    case CREATE_LIST_GROUP:
      return {
        ...state,
        lists: [...action.payload],
      };
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
        tasks: state.tasks.filter((val) => val.id !== action.payload.id),
      };
    case EDIT_LIST:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.id) {
            list.name = action.payload.name;
          }
          return list;
        }),
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((val) => val.id !== action.payload.id),
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            task.title = action.payload.title;
            task.date = action.payload.date;
            task.completed = action.payload.completed;
          }
          return task;
        }),
      };
    default:
      return {
        ...state,
      };
  }
};
