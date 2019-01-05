/* eslint-disable consistent-return */
import axios from "axios";
import login from "./login";
import userData from "./userData";
import logoList from "./logoList";
import vote from "./vote";

const axiosInstance = axios.create({
  timeout: 10000,
  responseType: "json",
  headers: {
    Authorization: localStorage.getItem("auth"),
  },
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.data) {
      if (response.data.success) return response;
      if (!response.data.success && response.data.message) {
        throw new Error(response.data.message);
      }
    } else {
      throw new Error("Unexpected answer from server");
    }
  },
  error => {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  },
);

export default {
  login: login(axiosInstance),
  userData: userData(axiosInstance),
  logoList: logoList(axiosInstance),
  vote: vote(axiosInstance),
};
