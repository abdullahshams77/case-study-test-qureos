const initialState: any = fromJS({
  appLoadersStatus: []
});
import { differenceBetweenDatesInMinutes } from "@/components/common/util/util";
import { createReducer, nanoid } from "@reduxjs/toolkit";
import { fromJS } from "immutable";

export const appReducer = createReducer(initialState, (builder) => {
  builder
    // You can chain calls, or have separate `builder.addCase()` lines each time
    .addCase("ADD_UPDATE_APP_LOADERS_STATUS", (state: any, action: any) => {
      return state.update("appLoadersStatus", (loaderStatus: any) => {
        let index = loaderStatus.findIndex(
          (status: any) =>
            status.get("actionType") === action.payload.data.actionType
        );
        if (index > -1) {
          if (action.payload.data.status === "FINNISH") {
            return loaderStatus.filterNot(
              (status: any) =>
                status.get("actionType") === action.payload.data.actionType
            );
          } else {
            if (action.payload.data.status === "PENDING") {
              let newStatus = loaderStatus.filterNot(
                (status: any) =>
                  status.get("actionType") === action.payload.data.actionType
              );
              const id = nanoid();
              return newStatus.push(
                fromJS({
                  timeStamp: Date.now(),
                  id,
                  actionType: action.payload.data.actionType,
                  status: action.payload.data.status,
                })
              );
            } else {
              return loaderStatus.updateIn([index], (status: any) => {
                if (action.payload.data.error) {
                  return status.merge({
                    timeStamp: Date.now(),
                    status: action.payload.data.status,
                    error: fromJS(action.payload.data.error),
                  });
                } else {
                  return status.merge({
                    timeStamp: Date.now(),
                    status: action.payload.data.status,
                  });
                }
              });
            }
          }
        } else {
          const id = nanoid();
          return loaderStatus.push(
            fromJS({
              timeStamp: Date.now(),
              id,
              actionType: action.payload.data.actionType,
              status: action.payload.data.status,
            })
          );
        }
      });
    })
    .addCase("CLEAR_APP_LOADER_STATUS", (state: any, action: any) => {
      return state.update("appLoadersStatus", (loaderStatus: any) => {
        return (
          loaderStatus &&
          loaderStatus.filter(
            (status: any) =>
              differenceBetweenDatesInMinutes(
                status.get("timeStamp"),
                new Date()
              ) <= 0.3
          )
        );
      });
    })
    .addCase("CLEAR_APP_ALERT_MESSAGE", (state: any, action: any) => {
      return state.update("appLoadersStatus", (appAlertMessages: any) => {
        const filteredMessages =
          appAlertMessages &&
          appAlertMessages.filterNot(
            (message: any) => message.get("id") == action?.payload?.data?.id
          );
        return filteredMessages;
      });
    })
    .addCase("CREATE_USER_SUCCESS", (state: any, action: any) => {
        window.localStorage.setItem("userid",action?.payload?.response?.data?._id);
        return state;
    })
    // You can apply a "matcher function" to incoming actions
    // and provide a default case if no other handlers matched
    .addDefaultCase((state, action) => {
      return state;
    });
});
