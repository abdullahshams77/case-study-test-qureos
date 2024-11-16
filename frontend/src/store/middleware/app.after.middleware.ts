"use client";
import { useKey } from "@/app/hooks/fetch";
import { addUpdateAppLoadersStatus } from "../actions/app.actions";
import { mutate } from "swr";
import { correctQueryString } from "@/components/common/util/util";

var timeout: any;
const appAfterMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  async (action: any) => {
    if (action.type.includes("SUCCESS")) {
      if (timeout) {
        clearTimeout(timeout);
      }
      action?.payload?.additionalData?.additionalData?.mutationKeys?.forEach(
        (key: any) => {
          let ke = useKey(key?.key, key?.params ? key?.params : {});
          ke = correctQueryString(ke);
          mutate(ke);
        }
      );
      if (
        action.payload &&
        action.payload.additionalData &&
        action.payload.additionalData.additionalData &&
        action?.payload?.additionalData?.additionalData?.successMessage
      ) {
        if (action?.payload?.additionalData?.additionalData?.appToastRef) {
          action?.payload?.additionalData?.additionalData?.appToastRef?.current?.show(
            {
              severity: "success",
              summary: "",
              detail:
                action?.payload?.additionalData?.additionalData?.successMessage,
              life: 3000,
            }
          );
        }
      }
      dispatch(
        addUpdateAppLoadersStatus({
          actionType: action.payload.baseType,
          loading: false,
          error: false,
          status: "DONE",
        })
      );
      timeout = setTimeout(() => {
        dispatch(
          addUpdateAppLoadersStatus({
            actionType: action.payload.baseType,
            status: "FINNISH",
          })
        );
      }, 1);
    } else if (action.type.includes("ERROR")) {
      dispatch(
        addUpdateAppLoadersStatus({
          actionType: action.payload.baseType,
          type: action.type,
          loading: false,
          error:
            action.payload &&
            action.payload.response &&
            action.payload.response.error,
          status: "ERROR",
        })
      );
    }
    if(action.type == "CREATE_USER_SUCCESS") {
      dispatch({
        type: "NAVIGATE",
        payload: {
          data: {
            redirectUrl: "/home",
          },
        },
      });
    }
    return next(action);
  };
export default appAfterMiddleware;
