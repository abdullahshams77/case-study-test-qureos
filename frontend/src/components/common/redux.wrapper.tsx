"use client";
import React from "react";
import ReduxProvider from "@/store/redux-provider";
import ErrorMessages from "@/components/common/app.alert.messages/error.messages/error.messages";
import AppNavigator from "@/app/app.navigator";
import { TransitionProvider } from "@/app/context/transition.context";

const ReduxWrapper = (props: any) => {
  return (
    <ReduxProvider>
      <ErrorMessages />
      <TransitionProvider>
        <AppNavigator />
      </TransitionProvider>
      {props.children}
    </ReduxProvider>
  );
};
export default ReduxWrapper;
