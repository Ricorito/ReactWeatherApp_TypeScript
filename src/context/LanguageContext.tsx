// src/context/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "../locales/en.json";
import hu from "../locales/hu.json";

type Language = "en" | "hu";

const translations = {
  en,
  hu,
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof en) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLangState] = useState<Language>("en");

  // Load from localStorage on initial mount
  useEffect(() => {
    const stored = localStorage.getItem("appLanguage");
    if (stored === "en" || stored === "hu") {
      setLangState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    localStorage.setItem("appLanguage", lang);
  };

  const t = (key: keyof typeof en) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
