import Search from "./components/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

import { LanguageProvider } from "./context/LanguageContext";
import LanguageSelector from "./components/LanguageSelector";

const App = () => {
  const { forecast, options, term, onOptionSelect, onSubmit, onInputChange } =
    useForecast();
  
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-500  to-sky-400">
        <div className="p-4 flex justify-end">
          <LanguageSelector />
        </div>

        <main className="flex-1 flex flex-col justify-center items-center w-full">
          {!forecast && (
            <Header>
              <Search
                term={term}
                options={options}
                onInputChange={onInputChange}
                onOptionSelect={onOptionSelect}
                onSubmit={onSubmit}
              />
            </Header>
          )}
          {forecast && <Forecast data={forecast} />}
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
