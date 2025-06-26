import axios from "axios";

const baseURL = "https://api.finmindtrade.com";

const axiosInstance = axios.create({
  baseURL,
  timeout: 60 * 1000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wNi0yNSAwOToyNToyMSIsInVzZXJfaWQiOiJTaGl5aW5ZdWFuIiwiaXAiOiIxNDAuMjQ1LjQ4LjU3In0.f6ANR6-dGISxjVcS-D3hdt8nh-WPMh3PA21fIhexpS4";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break;
        case 500:
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
