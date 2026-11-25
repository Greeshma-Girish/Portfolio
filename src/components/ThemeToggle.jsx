import { useEffect, useState } from 'react';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div
      className="theme-toggle gc mono"
      role="group"
      aria-label="Theme switcher"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={theme === 'light' ? 'on' : undefined}
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
      >
        ☀ Light
      </button>
      <button
        type="button"
        className={theme === 'dark' ? 'on' : undefined}
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
      >
        ☾ Dark
      </button>
    </div>
  );
}
