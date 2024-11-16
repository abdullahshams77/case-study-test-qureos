import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { appLoaderStatusSelector } from "@/store/selectors/app.selectors";
import { useAppDispatch } from "@/store/store";
import { clearAppAlertMessage } from "@/store/actions/app.actions";

export default function ErrorMessages() {
  const toast = useRef<Toast>(null);
  const dispatch = useAppDispatch();
  const appLoaderState:any = appLoaderStatusSelector();

  useEffect(() => {
    const errorMessages: any =
      appLoaderState &&
      appLoaderState.filter(
        (loaderStatus: any) => loaderStatus.get("status") === "ERROR"
      );
    errorMessages &&
      errorMessages.forEach((element: any) => {
        if (element && element.get("error") && typeof element.get('error') !== 'string') {
          toast.current?.show({
            severity: "error",
            summary: "",
            detail: element.get("error").get("message"),
            life: 3000,
          });
          dispatch(
            clearAppAlertMessage({
              id: element && element.get("id"),
            })
          );
        }
        else if(element && element.get("error") && typeof element.get('error') == 'string') {
          toast.current?.show({
            severity: "error",
            summary: "",
            detail: "An error has occurred. Please try again later. Some services may currently be unavailable.",
            life: 3000,
          });
          dispatch(
            clearAppAlertMessage({
              id: element && element.get("id"),
            })
          );
        }
      });
  }, [appLoaderState]);

  return (
    <div className="card flex justify-content-center">
      <Toast  ref={toast} />
    </div>
  );
}
