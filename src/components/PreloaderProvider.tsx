"use client";

import { useState, createContext, useContext } from "react";
import Preloader from "@/components/Preloader";

const PreloaderContext = createContext({ isLoaded: false });
export const usePreloader = () => useContext(PreloaderContext);

export default function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  return (
    <PreloaderContext.Provider value={{ isLoaded }}>
      {!isRemoved && (
        <Preloader 
          onComplete={() => {
            setIsLoaded(true);
            setTimeout(() => setIsRemoved(true), 1400); 
          }} 
        />
      )}
      {children}
    </PreloaderContext.Provider>
  );
}