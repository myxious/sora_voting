/* eslint-disable consistent-return */
import axios from "axios";
import login from "./login";
import userData from "./userData";
import logoList from "./logoList";
import vote from "./vote";
import cancelVote from "./cancelVote";

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
        throw new Error(`Server response: ${response.data.message}`);
      }
    }
    throw new Error("Unexpected answer from server");
  },
  error => {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  },
);

export function setAuthToken(token) {
  localStorage.setItem("auth", token);
  axiosInstance.defaults.headers.Authorization = token;
}

export default {
  login: login(axiosInstance),
  userData: userData(axiosInstance),
  logoList: logoList(axiosInstance),
  vote: vote(axiosInstance),
  cancelVote: cancelVote(axiosInstance),
};
