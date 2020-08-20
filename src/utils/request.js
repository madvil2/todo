import axios from "axios";

const createAxios = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${
    localStorage.getItem("token") || ""
  }`;
  return axios;
};

export const getAllTodos = () => (dispatch) => {
  createAxios()
    .get("/todolist")
    .then((res) => console.log(res))
    .catch((err) => {});
};
