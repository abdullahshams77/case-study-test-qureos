import { appLoaderStatusSelector } from "@/store/selectors/app.selectors";
import { Button } from "primereact/button";
import { appLoaderButtonTypes } from "./app.loader.button.types";

export function checkExecutionStatus(actionType: any, appLoaderState: any) {
  if (Array.isArray(actionType)) {
    if (appLoaderState && appLoaderState.size > 0) {
      let execution;
      for (var i = 0; i < actionType.length; i++) {
        execution =
          appLoaderState &&
          appLoaderState.find(
            (action: any) => action.get("actionType") == actionType[i]
          );
        if (execution) {
          break;
        }
      }
      return execution;
    }
    return "";
  } else {
    const action: any =
      appLoaderState &&
      appLoaderState.find(
        (action: any) => action.get("actionType") == actionType
      );
    return action;
  }
}
const AppLoaderButton: React.FC<appLoaderButtonTypes> = (props: any) => {
  const {
    label,
    disabled,
    style,
    actionType,
    loadingLabel,
    showLoader = true,
  } = props;
  const newProps = { ...props };
  delete newProps.actionType;
  delete newProps.showLoader;
  delete newProps.loadingLabel;
  const appLoaderState: any = appLoaderStatusSelector();
  const action: any = checkExecutionStatus(actionType, appLoaderState);
  return (
    <>
      <Button
        loading={
          action && action.get("status") === "PENDING" && showLoader
            ? true
            : false
        }
        onClick={props.onClick}
        disabled={
          action && action.get("status") === "PENDING" ? true : disabled
        }
        className="flex flex-row-reverse w-full mb-3 text-sm font-semibold p-button-rounded"
        style={style ? style : { backgroundColor: "#00CB56" }}
        {...newProps}
        label={
          action && action.get("status") === "PENDING" && loadingLabel
            ? loadingLabel
            : label
        }
      />
    </>
  );
};

export default AppLoaderButton;
