"use client";
import NoSsrWrapper from "@/components/common/no.ssr.wrapper/no.ssr.wrapper";
import { SWRProvider } from "./swr-provider";
import ReduxWrapper from "@/components/common/redux.wrapper";

export const SWRProviderWrapper = ({ children }: any) => {
  return (
    <ReduxWrapper>
      <NoSsrWrapper>
        <SWRProvider>{children}</SWRProvider>
      </NoSsrWrapper>
    </ReduxWrapper>
  );
};
