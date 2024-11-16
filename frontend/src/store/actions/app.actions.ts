import { createAction } from "@reduxjs/toolkit";

export const performOperation = createAction('PERFORM_OPERATION', (data: any = {},additionalData:any = {}) => ({
    payload: {
        data: {...data, url: undefined, method: undefined},
        additionalData: additionalData,
        url: data.url,
        method: data.method
    }
}));

export const sendOTP = createAction('SEND_OTP', (data: any = {},additionalData:any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData,
        url: 'users/sendOtp',
        method: 'POST'
    }
}));

export const resetSendOTP = createAction('RESET_SEND_OTP', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        resetActionNames: ["SEND_OTP"]
    }
}));



export const addUpdateAppLoadersStatus = createAction('ADD_UPDATE_APP_LOADERS_STATUS', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData
    }
}));

export const closeAccountSetupWizard = createAction('CLOSE_ACCOUNT_SETUP_WIZARD', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData
    }
}));

export const openAccountSetupWizard = createAction('OPEN_ACCOUNT_SETUP_WIZARD', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData
    }
}));

export const getProfile = createAction('GET_PROFILE', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData
    }
}));

export const clearAppAlertMessage = createAction('CLEAR_APP_ALERT_MESSAGE', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData
    }
}));

export const clearAppLoaderStatus = createAction('CLEAR_APP_LOADER_STATUS', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData
    }
}));

export const cancelAllRequest = createAction('CANCEL_ALL_REQUEST', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData
    }
}));

export const cancelRequest = createAction('CANCEL_REQUEST', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData
    }
}));

export const resetTesting = createAction('RESET_TESTING', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        resetActionNames: ["LOGIN"]
    }
}));
