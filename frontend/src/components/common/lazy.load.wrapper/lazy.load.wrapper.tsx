import React, { useEffect, useState } from 'react';
import AppSpinner from '@/components/common/app.spinner/app.spinner';
import { usePathname } from 'next/navigation';

const LazyLoadWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname(); // Detects the current route
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5); // Introduce the desired delay here

    return () => clearTimeout(timer);
  }, [pathname]);

  if (isLoading) {
    return <AppSpinner />; // Show loading spinner while waiting
  }

  return <>{children}</>; // Render the children after the delay
};

export default LazyLoadWrapper;