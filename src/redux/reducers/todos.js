import { ADD_LIST, REMOVE_LIST } from "../../constants";
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
    tasks: [
      {
        id: 1,
        listId: 2,
        text: "Изучить JavaScript",
        completed: false,
      },
      {
        id: 2,
        listId: 2,
        text: "Изучить паттерны проектирования",
        completed: false,
      },
      {
        id: 3,
        listId: 2,
        text: "ReactJS Hooks (useState, useReducer, useEffect и т.д.)",
        completed: true,
      },
      {
        id: 4,
        listId: 2,
        text: "Redux (redux-observable, redux-saga)",
        completed: false,
      },
    ],
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
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    case REMOVE_LIST:
      window.state = state;
      window.action = action;
      return {
        ...state,
        lists: state.lists.filter((val) => val.id !== action.payload.id),
      };
    default:
      return {
        ...state,
      };
  }
};
