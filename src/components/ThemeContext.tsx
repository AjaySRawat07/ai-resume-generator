'use client'

import { darkTheme, lightTheme } from '@/lib/theme';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
}

const defaultValue: ThemeContextType = {
  isDark: false,
  toggleTheme: () => {
    console.warn('toggleTheme called outside of ThemeProvider');
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultValue);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(defaultValue.isDark);

  const toggleTheme = () => {
    setIsDark(!isDark);
    const mode = !isDark ? 'dark' : 'light'
    localStorage.setItem("theme",JSON.stringify(mode))
  }

  useEffect(()=>{
    const currentMode= localStorage.getItem("theme")
    if(currentMode){
      const mode= JSON.parse(currentMode)
      setIsDark(mode==='dark'?true:false)
    }
  },[])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className='h-screen w-screen fixed top-0' 
        style={{ 
          backgroundColor: isDark ? darkTheme.primary : lightTheme.primary,
          color: isDark ? darkTheme.text : lightTheme.text 
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
