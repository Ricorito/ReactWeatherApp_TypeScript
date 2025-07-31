import { ReactNode } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const { t } = useLanguage();

  return (
    <section className="w-full md:max-w-[500px] p-4 flex 
    flex-col text-center items-center justify-center 
    md:px-10 lg:p-24 h-full lg:h-[500px] 
    bg-opacity-20 backdrop-blur-lg
    rounded-lg drop-shadow-lg text-gray-900 
    ">
             
      <h1 className="text-4xl font-thin text-white">
        {t("title")}
        <span className="font-black text-zinc-800">{t("subtitle")}</span>
      </h1>

      <p className="text-sm mt-2">{t("description")}</p>
      <div className="mt-4 w-full ">
        {children}
      </div>
    </section>
  );
};

export default Header;
