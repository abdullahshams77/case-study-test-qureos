// src/components/PageWrapper.tsx
import AppSpinner from "@/components/common/app.spinner/app.spinner";
import dynamic from "next/dynamic";
import React, { ComponentType } from "react";

const withDynamicLoading = (Component: ComponentType) => {
  return dynamic(() => Promise.resolve(Component), {
    loading: () => {
      return (
        <AppSpinner />
      );
    }, // Define a default loading state
    ssr: false, // Ensure the component is dynamically imported on the client side
    suspense: true
  });
};

export default withDynamicLoading;
