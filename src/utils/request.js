import axios from "axios";

const createAxios = () => {
  axios.defaults.headers.Authorization = `Bearer ${
    localStorage.getItem("token") || ""
  }`;
  return axios;
};

export default createAxios;
