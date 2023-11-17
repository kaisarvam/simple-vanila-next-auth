import axios from "axios";
import defaultConfig from "../../config";

const axiosInterceptorInstance = axios.create({
  baseURL: defaultConfig.baseURL,
});

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    const userdata = localStorage.getItem("userData");
    const ParsedData = JSON.parse(userdata);
    const accessToken = ParsedData?.token;
    if (accessToken) {
      if (config.headers) config.headers.Authorization = `Token ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
