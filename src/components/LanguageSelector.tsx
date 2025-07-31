import { useLanguage } from "../context/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      className="p-2 rounded bg-white text-black"
      value={language}
      onChange={(e) => setLanguage(e.target.value as "en" | "hu")}
    >
      <option value="en">EN</option>
      <option value="hu">HU</option>
    </select>
  );
};

export default LanguageSelector;
