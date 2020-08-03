import { ADD_TASK, ADD_LIST } from "../../constants";
import { load, clear } from "redux-localstorage-simple";
// clear({
//   namespace: "todo",
// });
let Todos = load({ namespace: "todo" }).todos;
if (
  Todos === undefined ||
  !Object.keys(Todos).length ||
  !Todos.lists.length >= 8
) {
  Todos = {
    tasks: [],
    lists: [
      { id: 1, name: "Покупки", colorId: 5 },
      { id: 2, name: "Фронтенд", colorId: 4 },
      { id: 2, name: "Фильмы и сериалы", colorId: 3 },
      { id: 3, name: "Книги", colorId: 2 },
      { id: 4, name: "Личное", colorId: 1 },
    ],
    colors: [
      { id: 1, hex: "#C9D1D3", name: "grey" },
      { id: 2, hex: "#42B883", name: "green" },
      { id: 3, hex: "#64C4ED", name: "blue" },
      { id: 4, hex: "#FFBBCC", name: "pink" },
      { id: 5, hex: "#B6E6BD", name: "lime" },
      { id: 6, hex: "#C355F5", name: "purple" },
      { id: 7, hex: "#110133", name: "black" },
      { id: 8, hex: "#FF6464", name: "red" },
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
    default:
      return {
        ...state,
      };
  }
};
