import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from "../helpers";
import { forecastType } from "../types";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import Tile from "./Tile";
import { useLanguage } from "../context/LanguageContext";

type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>{temp}°C</span>
);

const Forecast = ({ data }: Props): JSX.Element => {
  const { t } = useLanguage();
  const today = data.list[0];
  return (
    <div
      className="w-full min-h-[800px] md:max-w-[500px] py-4 md:py-4
    md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20
    backdrop-blur-ls rounded drop-shadow-lg">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name}
            <span className="font-thin"> {data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold text-black font-mono">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm capitalize">
            {today.weather[0].main}
            <br />
            {today.weather[0].description}
          </p>
          <p className="text-base text-black">
            H: <Degree temp={Math.ceil(today.main.temp_max)} />
            {" | "}
            L: <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
          {data.list.map((item, i) => (
            <div
              className="inline-block text-center w-[50px] flex-shrink-0"
              key={i}>
              <p className="text-sm">
                {i === 0
                  ? t("now")
                  : `${new Date((item.dt + data.timezone) * 650)
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:00`}
              </p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap justify-between text-zinc-700">
          <div
            className="w-[140px] text-xs font-bold flex flex-col
        items-center bg-white/20 backdrop-blur-lg rounded 
        drop-shadow-lg py-4 mb-5 border border-white text-black">
            <Sunrise />
            <p className="text-zinc-950">{t("sunrise")}</p>
            <span className="mt-2 text-lg text-white font-mono">
              {getSunTime(data.sunrise)}
            </span>
          </div>

          <div
            className="w-[140px] text-xs font-bold flex flex-col
        items-center bg-white/20 backdrop-blur-lg rounded 
        drop-shadow-lg py-4 mb-5 border border-white text-black">
            <Sunset />
            <p className="text-zinc-950">{t("sunset")}</p>
            <span className="mt-2 text-lg text-white font-mono">
              {getSunTime(data.sunset)}
            </span>
          </div>

          <Tile
            icon="wind"
            title={t("wind")}
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(Math.round(today.wind.deg))}, ${t(
              "gusts"
            )} ${today.wind.gust.toFixed(1)} km/h`}
          />

          <Tile
            icon="feels"
            title={t("feelsLike")}
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? t("feelsColder")
                : t("feelsWarmer")
            }
          />

          <Tile
            icon="humidity"
            title={t("humidity")}
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />

          <Tile
            icon="pop"
            title={t("precipitation")}
            info={`${Math.round(today.pop * 100)} %`}
            description={`${getPop(today.pop)}, ${t("cloudsAt")} ${
              today.clouds.all
            }%`}
          />

          <Tile
            icon="pressure"
            title={t("pressure")}
            info={`${today.main.pressure} hPa`}
            description={
              Math.round(today.main.pressure) < 1030
                ? t("lowerThanStandard")
                : t("higherThanStandard")
            }
          />

          <Tile
            icon="visibility"
            title={t("visibility")}
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
  );
};

export default Forecast;
