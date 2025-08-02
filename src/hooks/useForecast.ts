import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../types";

const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForcast] = useState<forecastType | null>(null);

  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((e) => console.log(e));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);

    if (value === "") return;

    getSearchOptions(value);
  };

  const getForecast = async (city: optionType) => {
    try {
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      const forecastData = await forecastRes.json();

      const uviRes = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const uviData = await uviRes.json();

      const combinedData = {
        ...forecastData.city,
        list: forecastData.list.slice(0, 16),
        uvi: uviData.value, 
      };

      setForcast(combinedData);
    } catch (e) {
    }
  };

  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    forecast,
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
  };
};

export default useForecast;
