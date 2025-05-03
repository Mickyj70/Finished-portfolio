import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BsCloudMoon } from 'react-icons/bs';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-2 bg-opacity-80 backdrop-blur-sm p-2 rounded-full">
      <button
        onClick={() => toggleTheme('dark')}
        className={`p-2 rounded-full transition-all ${
          theme === 'dark' 
            ? 'bg-dark-primary text-white scale-110' 
            : 'text-gray-400 hover:text-gray-100'
        }`}
        aria-label="Dark theme"
      >
        <FaMoon />
      </button>
      
      <button
        onClick={() => toggleTheme('dim')}
        className={`p-2 rounded-full transition-all ${
          theme === 'dim' 
            ? 'bg-dim-primary text-white scale-110' 
            : 'text-gray-400 hover:text-gray-100'
        }`}
        aria-label="Dim theme"
      >
        <BsCloudMoon />
      </button>
      
      <button
        onClick={() => toggleTheme('light')}
        className={`p-2 rounded-full transition-all ${
          theme === 'light' 
            ? 'bg-light-primary text-white scale-110' 
            : 'text-gray-400 hover:text-gray-100'
        }`}
        aria-label="Light theme"
      >
        <FaSun />
      </button>
    </div>
  );
};

export default ThemeSwitcher;