'use client';

import { Toast } from 'primereact/toast';
import React, { useRef, createContext, useContext } from 'react';

// Create the context
const RefToastContext = createContext<any>(null);

// Provider component to wrap the app and provide the ref
export const RefToastProvider = ({ children }:any) => {
  const appToastRef = useRef<Toast>(null);
  return (
    <RefToastContext.Provider value={appToastRef}>
         <Toast ref={appToastRef} />
      {children}
    </RefToastContext.Provider>
  );
};

// Custom hook to access the ref
export const useRefToastContext = () => useContext(RefToastContext);
