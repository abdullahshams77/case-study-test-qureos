// context/LoadingContext.js
'use client'
import { createContext, useState, useContext } from "react";

// Define the shape of the context
interface TransitionContextProps {
  isTransition: boolean;
  startTheTransition: () => void;
  stopTheTransition: () => void;
}

// Create the context with an initial empty object
const TransitionContext = createContext<TransitionContextProps | undefined>(undefined);
export const TransitionProvider = ({ children }: any) => {
  const [isTransition, setIsTransition] = useState(false);

  const startTheTransition = () => setIsTransition(true);
  const stopTheTransition = () => setIsTransition(false);

  return (
    <TransitionContext.Provider value={{ isTransition, startTheTransition, stopTheTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

// Custom hook to use the context
export const useTransitioning = (): TransitionContextProps => {
  const context = useContext(TransitionContext);
  
  // Handle cases where the context is undefined
  if (!context) {
    throw new Error("useTransitioning must be used within a TransitionProvider");
  }
  
  return context;
};
