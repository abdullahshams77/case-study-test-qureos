import { createAction } from "@reduxjs/toolkit";

export const addUpdateAppLoadersStatus = createAction('ADD_UPDATE_APP_LOADERS_STATUS', (data: any = {}, additionalData: any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData
    }
}));

export const createUser = createAction('CREATE_USER', (data: any = {},additionalData:any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData,
        url: 'users',
        method: 'POST'
    }
}));

export const addNewHabit = createAction('ADD_NEW_HABIT', (data: any = {},additionalData:any = {}) => ({
    payload: {
        data: data,
        additionalData: {...additionalData, successMessage: "Habit added successfully"},
        url: 'habits',
        method: 'POST'
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
