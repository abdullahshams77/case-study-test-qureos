import { createAction } from "@reduxjs/toolkit";

export const resetNavigation = createAction('RESET_NAVIGATION', (data: any = {},additionalData:any = {}) => ({
    payload: {
        data: data,
        additionalData: additionalData
    }
}));