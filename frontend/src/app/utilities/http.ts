//import Router from 'next/router';
import axios, { AxiosError } from "axios";

const http = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
const http2 = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
//const { v4: uuidv4 } = require("uuid");
import { getCookie } from "cookies-next";
//import { Router } from "next/router";

http.interceptors.request.use(
  async (config: any) => {
    const deviceSerial = getCookie("deviceSerial"); // => 'value'
    const accessToken = getCookie("access_token");
    if (!deviceSerial) {
      //const uuid = "123";//uuidv4();
      //setCookie("deviceSerial", uuid);
      //config.headers["X-Device-Serial"] = uuid;
      if (accessToken)
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      if (accessToken)
        config.headers["Authorization"] = `Bearer ${accessToken}`;

      config.headers["X-Device-Serial"] = deviceSerial;
    }
    //config?.appToastRef?.current?.show({ severity: 'error', summary: '', detail: 'yes', life: 3000 });
    // config.headers['Authorization'] = `Bearer ${getCookie('token')}`;
    // config.headers['X-Language'] = localStorage.getItem(LANG);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http2.interceptors.request.use(
  async (config: any) => {
    const deviceSerial = getCookie("deviceSerial"); // => 'value'
    const accessToken = getCookie("access_token");
    if (!deviceSerial) {
      //const uuid = uuidv4();
      //setCookie("deviceSerial", uuid);
      //config.headers["X-Device-Serial"] = uuid;
      if (accessToken)
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      if (accessToken)
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      //config.headers["X-Device-Serial"] = deviceSerial;
    }
    config?.appToastRef?.current?.show({ severity: 'error', summary: '', detail: 'yes', life: 3000 });
    // config.headers['Authorization'] = `Bearer ${getCookie('token')}`;
    // config.headers['X-Language'] = localStorage.getItem(LANG);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http2.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    if (response.config.url?.includes("etc/url")) {
      return response?.data?.content;
    } else return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // toast.error(error?.response?.data?.message || error.message);
     // return Router.push('/login');
    }
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

export { http, http2, catchError };
