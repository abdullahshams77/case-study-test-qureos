'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Create a context to manage global loading state
const GlobalLoadingContext = createContext({
    isPageLoaded: false
});

export function GlobalLoadingProvider({ children }:any) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Set a delay before allowing data fetching
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 40); // Delay of 400 milliseconds

    setIsPageLoaded(false); // Reset page load state on pathname change

    return () => clearTimeout(timer);
  }, [pathname]); // Dependency on pathname to trigger on route change

  return (
    <GlobalLoadingContext.Provider value={{ isPageLoaded }}>
      {children}
    </GlobalLoadingContext.Provider>
  );
}

export function useGlobalLoading() {
  return useContext(GlobalLoadingContext);
}