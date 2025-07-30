import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <section className="w-full md:max-w-[500px] p-4 flex 
    flex-col text-center items-center justify-center 
    md:px-10 lg:p-24 h-full lg:h-[500px] 
    bg-opacity-20 backdrop-blur-lg
    rounded-lg drop-shadow-lg text-gray-900
    ">
      <h1 className="text-4xl font-thin text-white">Weather
        <span className="font-black text-zinc-800">ForecastAPP</span>
      </h1>
      <p className="text-sm mt-2">
        Enter below a place you want to know 
        the weather of and select an option from
        the dropdown
      </p>
      <div className="mt-4 w-full ">
        {children}
      </div>
    </section>
  )
}

export default Header;
