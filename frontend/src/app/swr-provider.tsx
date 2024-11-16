"use client";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: any) => {
  return (
    <SWRConfig
      value={{
        revalidateOnReconnect: true,
        //isPaused: () => !isAuthorized, // Pause all SWR calls if token is not present
        errorRetryCount: 2,
      }}>
      {children}
    </SWRConfig>
  );
};
