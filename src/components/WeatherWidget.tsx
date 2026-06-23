import { useEffect, useState, useRef } from "react";
import { HoloWrapper } from "./HoloWrapper";
import { appConfig } from "../config";

interface OpenMeteoCurrent {
  temperature_2m: number;
  weathercode: number;
  windspeed_10m: number;
}

interface OpenMeteoDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  precipitation_probability_max: number[];
}

interface OpenMeteoData {
  current: OpenMeteoCurrent;
  daily: OpenMeteoDaily;
}

export function WeatherWidget() {
  const [data, setData] = useState<OpenMeteoData | null>(null);
  const lastGoodData = useRef<OpenMeteoData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const loc = appConfig.location;
        const url =
          "https://api.open-meteo.com/v1/forecast" +
          "?latitude=" + loc.latitude +
          "&longitude=" + loc.longitude +
          "&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max" +
          "&current=temperature_2m,weathercode,windspeed_10m" +
          "&timezone=" + encodeURIComponent(loc.timezone) +
          "&forecast_days=7";
        const res = await fetch(url);
        const json = await res.json();
        if (json?.current && json?.daily) {
          lastGoodData.current = json;
          setData(json);
        } else {
          console.error("Open-Meteo: unexpected response", json);
        }
      } catch (err) {
        console.error("Weather fetch failed:", err);
        if (lastGoodData.current) {
          setData(lastGoodData.current);
        }
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!data)
    return <HoloWrapper theme="cyan" className="animate-pulse blur"><div/></HoloWrapper>;

  const cur = data.current;

  return (
    <HoloWrapper theme="cyan" className="justify-start">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest">Environment</h2>
        <div className="flex items-center gap-2 text-xs font-bold uppercase font-mono text-cyan-200">
          {cur.windspeed_10m} KM/H
        </div>
      </div>

      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {Math.round(cur.temperature_2m)}<span className="text-3xl text-cyan-400 font-bold ml-1">\u00b0</span>
            </div>
          </div>
        </div>

        <div className="w-[2px] self-stretch bg-cyan-400/20 my-2" />

        <div className="grid grid-cols-5 gap-2 flex-1 overflow-hidden">
          {data.daily.time.slice(0, 5).map((dateStr, i) => {
            const label = i === 0 ? "TODAY" : i === 1 ? "TOM" : new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
            const isToday = i === 0;
            return (
              <div key={dateStr} className={"flex flex-col items-center gap-1 min-w-0 rounded-lg p-2 " + (isToday ? "bg-cyan-400/10 border border-cyan-400/20" : "")}>
                <span className="text-xs font-bold font-mono text-cyan-300 uppercase tracking-widest">{label}</span>
                <span className="text-2xl font-bold text-white">{Math.round(data.daily.temperature_2m_max[i])}\u00b0</span>
              </div>
            );
          })}
        </div>
      </div>
    </HoloWrapper>
  );
}
