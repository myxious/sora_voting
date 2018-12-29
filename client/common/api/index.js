import axios from "axios";
import login from "./login";
import userData from "./userData";

const axiosInstance = axios.create({
  timeout: 10000,
  responseType: "json",
  headers: {
    Authorization: localStorage.getItem("auth"),
  },
});

axiosInstance.interceptors.response.use(response => {
  if (response.data) {
    if (response.data.success) return response;
    if (!response.data.success && response.data.message) {
      throw new Error(response.data.message);
    }
  }
  return response;
});

export default {
  login: login(axiosInstance),
  userData: userData(axiosInstance),
};
