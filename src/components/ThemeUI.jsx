import { useEffect, useState } from 'react';
import { themes } from '../utils/index';

const initialTHeme = () => {
  return JSON.parse(localStorage.getItem('nimoTheme')) || themes[2];
};

const ThemeUI = () => {
  const [theme, setTheme] = useState(initialTHeme());
  const handleThemeChange = (theme) => {
    setTheme(theme);
    localStorage.setItem('nimoTheme', JSON.stringify(theme));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 capitalize px-3 sm:px-5"
      >
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl right-0"
      >
        {themes.map((themeOption) => (
          <li key={themeOption}>
            <label className="theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize">
              <input
                type="radio"
                name="theme-dropdown"
                value={themeOption}
                checked={theme === themeOption} // mark the selected theme
                onChange={() => handleThemeChange(themeOption)} // change theme on selection
                aria-label={themeOption}
                className="hidden"
              />
              {themeOption}
              {/* {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}  */}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeUI;
