import axios from "axios";

export const API_DOMAIN = import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173";

if (!API_DOMAIN) {
  throw new Error("API_DOMAIN is not defined in the environment variables.");
}

const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer 6|PusopccWtvcuq1QW8D5UjFjnLnvymIFOseLunPUAc54a1bd9`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosBaseUrl = axios.create({
  baseURL: API_DOMAIN,
});

export default axiosInstance;
