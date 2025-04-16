import React from 'react';
import { useUI } from '../store/zustand/hooks';
import { ThemeMode } from '../enums/ui';

// Before: With React.memo
/*
interface ThemeToggleProps {
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeToggle = React.memo(({ theme, onThemeChange }: ThemeToggleProps) => {
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value as 'light' | 'dark' | 'system';
    onThemeChange(newTheme);
  };

  return (
    <div className="theme-toggle">
      <label htmlFor="theme-select">Theme:</label>
      <select 
        id="theme-select" 
        value={theme} 
        onChange={handleThemeChange}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
});
*/

// After: With Zustand
const ThemeToggle = () => {
  // Get theme and setTheme directly from the store using our custom hook
  const { theme, setTheme } = useUI();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value as ThemeMode;
    setTheme(newTheme);
  };

  return (
    <div className="theme-toggle">
      <label htmlFor="theme-select">Theme:</label>
      <select id="theme-select" value={theme} onChange={handleThemeChange}>
        <option value={ThemeMode.LIGHT}>Light</option>
        <option value={ThemeMode.DARK}>Dark</option>
        <option value={ThemeMode.SYSTEM}>System</option>
      </select>
    </div>
  );
};

export default ThemeToggle;
