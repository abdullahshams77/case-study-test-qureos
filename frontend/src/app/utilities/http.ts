import axios, { AxiosError } from "axios";
const http = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

http.interceptors.request.use(
  async (config: any) => {
    if(window.localStorage.getItem("userid"))
    config.headers["userid"] = window.localStorage.getItem("userid");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

const catchError = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    // return toast.error(error?.response?.data?.message);
  } else {
    //return toast.error(error?.message);
  }
};

export { http, catchError };
