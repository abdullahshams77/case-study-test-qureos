import { http, trailingSlash } from "@/app/utilities";
import queryString from "query-string";
import { parse } from "url";

export const fetcher = (url: string) =>
  http(url)
    .then((res) => res.data)
    .catch(({ response }) => response.data);
//prettier-ignore
export const fetcher2 = (url: string, params: any) => {
    return http.get(url, params).then((res) => {
        if(res?.data?.error) {
            params?.appToastRef?.current?.show({ severity: 'error', summary: '', detail: res?.data?.error?.message, life: 3000 });
        }
        else {
          return res.data
        }
        
    }).catch(({ response }) => {
        params?.appToastRef?.current?.show({ severity: 'error', summary: '', detail: "Some Error Occured", life: 3000 });
        return response.data;
    });
}


export const fetcherPost = (url: string, params: any) => {
  if (params && params.type === "test") {
    const parsedUrl = parse(url, true);
    // Now you can access the query parameters from the parsed URL object
    const { page } = parsedUrl.query;
    return http
      .post(url, {
        ...params,
        page: Number(page),
      })
      .then((res) => {
        return res;
      })
      .catch(({ response }) => {
        params?.appToastRef?.current?.show({
          severity: "error",
          summary: "",
          detail: response?.data?.error?.message,
          life: 3000,
        });
      });
  } else {
    return http
      .post(url, {
        ...params,
      })
      .then((res) => res.data)
      .catch(({ response }) => {
        params?.appToastRef?.current?.show({
          severity: "error",
          summary: "",
          detail: response?.data?.error?.message,
          life: 3000,
        });
      });
  }
};

export function makeKey(path: string, params?: Record<string, any>) {
  return params
    ? `${trailingSlash(path)}?${queryString.stringify(params)}`
    : `${trailingSlash(path)}`;
}

export function useKey(path: string, params?: Record<string, any>) {
  let finalQuery = { ...params };
  return makeKey(path, finalQuery);
}
