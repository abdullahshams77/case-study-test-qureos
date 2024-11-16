import { addUpdateAppLoadersStatus, cancelRequest, clearAppLoaderStatus } from "../actions/app.actions";

const appBeforeMiddleware = ({ dispatch }: any) => (next: any) => async (action: any) => {
    if (action.payload && action.payload.url) {
        dispatch(clearAppLoaderStatus());
        dispatch(addUpdateAppLoadersStatus({
            actionType: action.type,
            loading: true,
            error: false,
            status: 'PENDING'
        }))
        // Add a timestamp to the action payload
        action.payload.timestamp = Date.now();
    }
    if (action.type && action.type.includes("RESET")) {
        if (action.payload && action.payload.resetActionNames) {
            for (var i = 0; i < action.payload.resetActionNames.length; i++) {
                dispatch(cancelRequest({
                    type: action.payload.resetActionNames[i]
                }))
                dispatch(addUpdateAppLoadersStatus({
                    actionType: action.payload.resetActionNames[i],
                    status: 'FINNISH'
                }))
            }
        }
    }
    return next(action)
};
export default appBeforeMiddleware;
