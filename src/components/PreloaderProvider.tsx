"use client";

import { useState, createContext, useContext } from "react";
import Preloader from "@/components/Preloader";

// 1. Create the context
const PreloaderContext = createContext({ isLoaded: false });

// 2. Export the hook explicitly
export const usePreloader = () => useContext(PreloaderContext);

export default function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isRemoved, setIsRemoved] = useState(false);
  
  // You might want isLoaded to reflect when the animation is finished
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <PreloaderContext.Provider value={{ isLoaded }}>
      {!isRemoved && (
        <Preloader 
          onComplete={() => {
            setIsLoaded(true);
            setTimeout(() => setIsRemoved(true), 1500);
          }} 
        />
      )}
      {children}
    </PreloaderContext.Provider>
  );
}