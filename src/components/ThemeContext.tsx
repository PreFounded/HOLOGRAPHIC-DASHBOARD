import { createContext, useContext, useState, ReactNode } from 'react';

type ColorTheme = "cyan" | "green" | "purple" | "amber" | "white" | "rgb";

interface ThemeContextType {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'cyan',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Detect RGB mode from URL
  const isRgb = window.location.pathname.includes('rgb') || window.location.search.includes('rgb');
  const [theme, setTheme] = useState<ColorTheme>(isRgb ? 'rgb' : 'cyan');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
