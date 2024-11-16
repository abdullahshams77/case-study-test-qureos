import { differenceBetweenDatesInMinutes } from "@/components/common/util/util";
import axios from "axios";
//const { v4: uuidv4 } = require("uuid");
import { getCookie } from "cookies-next";

function parseJSON(response: any) {
  if (
    response.status === 402 ||
    response.status === 401 ||
    response.status === 419 ||
    response.status === 400 ||
    response.status === 500 ||
    response.status === 404
  ) {
     if (response.data.error && response.data.error.message) {
      return response.data;
    } else if (
      response.data.error &&
      (typeof response.data.error === "string" ||
        response.data.error instanceof String)
    ) {
      return {
        error: {
          message: response.data.error,
        },
      };
    } else {
      return {
        error: response.data,
      };
    }
  }
  else if (response.data) {
    return response && response.data;
  } else {
    if(response && response.error) {
      return {
        error: {
          message: response?.error?.message
        }
      };
    }
    else {
      return {
        operationDone: true,
      };
    }
  }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    if (response && response.data) {
      return response;
    } else
      return {
        success: true,
      };
  }
  if (response.status === 500) {
    return response;
  }

  if (response.status === 400) {
    return response;
  }
  if (response.status === 402) {
    return response;
  }
  if (response.status === 404) {
    return response;
  }
  if (
    response.status === 401 ||
    response.status === 419 ||
    response.status === 403
  ) {
    return {
      code: 401,
      error: response.data.error,
      message: "Session Expired",
    };
  }

  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
}
const PUBLIC_ACCESS_ACTIONS = ["abc"];
var cancelSources: any = [];
const apiMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  async (action: any) => {
    if (action.type === "CANCEL_REQUEST") {
      //const cancelSrc = cancelSources && cancelSources.find((source)=> source.type === action.payload.type);
      //cancelSrc && cancelSrc.cancelFunction && cancelSrc.cancelFunction();
      const cancelSrces =
        cancelSources &&
        cancelSources.filter(
          (source: any) => source.type === action?.payload?.data?.type
        );
      cancelSrces &&
        cancelSrces.map((src: any) => {
          src && src.cancelFunction && src.cancelFunction();
        });
      cancelSources =
        cancelSources &&
        cancelSources.filter(
          (source: any) => source.type !== action?.payload?.data?.type
        );
      //cancelSrc && cancelSrc.cancelFunction && cancelSrc.cancelFunction();
    }
    if (action.type === "CANCEL_ALL_REQUEST") {
      const cancelSrcesAl =
        cancelSources &&
        cancelSources.filter((source: any) => {
          if (PUBLIC_ACCESS_ACTIONS.indexOf(source.type) !== -1) {
          } else {
            return true;
          }
        });
      cancelSrcesAl &&
        cancelSrcesAl.map((src: any) => {
          src && src.cancelFunction && src.cancelFunction();
        });
      cancelSources =
        cancelSources &&
        cancelSources.filter((source: any) => {
          if (PUBLIC_ACCESS_ACTIONS.indexOf(source.type) !== -1) {
            return true;
          } else {
          }
        });
    }
    if (action.payload && action.payload.url) {
      const cancelSrcesSameUrl =
        cancelSources &&
        cancelSources.filter(
          (source: any) => source.url === action.payload.url
        );
      cancelSrcesSameUrl &&
        cancelSrcesSameUrl.map((src: any) => {
          src && src.cancelFunction && src.cancelFunction();
        });
      const CancelToken = axios.CancelToken;
      let tkn = new CancelToken(function executor(c) {
        cancelSources =
          cancelSources &&
          cancelSources.filter(
            (source: any) =>
              differenceBetweenDatesInMinutes(
                source.executionDate,
                new Date()
              ) <= 4
          );
        //cancelSources = cancelSources && cancelSources.filter((source)=> source.type !== action.type);
        cancelSources.push({
          type: action.type,
          cancelFunction: c,
          url: action.payload.url,
          executionDate: new Date(),
        });
      });
      let headers = {};
      if(window.localStorage.getItem("userid")) {
        headers = { ...headers, "userid": `${window.localStorage.getItem("userid")}` };
      }
      const resAxios = axios({
        //...options,
        url: `${process.env.NEXT_PUBLIC_API_URL}/${action.payload.url}`,
        method: action.payload.method,
        data: action.payload.data,
        headers: headers,
        cancelToken: tkn,
        validateStatus: function (status) {
          return status >= 200 && status <= 700;
        },
      })
        .then(checkStatus)
        .then(parseJSON)
        .then((response) => {
          if (response && response.error) {
            if (response.code == 401) {
              
            } else {
              dispatch({
                type: `${action.type}_ERROR`,
                payload: {
                  additionalData: action.payload,
                  response,
                  baseType: action.type,
                },
              });
            }
          } else {
            dispatch({
              type: `${action.type}_SUCCESS`,
              payload: {
                additionalData: action.payload,
                response,
                baseType: action.type,
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error && error.__CANCEL__ === true) {
            return {
              code: 1,
              message: "Request Cancelled",
            };
          } else {
            return {
              code: 0,
              message: "Connection Failed",
            };
          }
        });
      return resAxios;
    } else {
      return next(action);
    }
  };
export default apiMiddleware;
