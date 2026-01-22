import { useTheme } from "../../../contexts/ThemeContext";
import "./Theme.css";

export default function Theme() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <select
      className="theme-switcher"
      value={theme}
      onChange={handleThemeChange}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
