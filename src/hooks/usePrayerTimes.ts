import { useState, useEffect } from "react";
import { differenceInSeconds, parse } from "date-fns";
import { appConfig } from "../config";

export interface PrayerTimesData {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

export function usePrayerTimes() {
  const [times, setTimes] = useState<PrayerTimesData | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; diffSeconds: number } | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const loc = appConfig.location;
        const url = encodeURI(
          "https://api.aladhan.com/v1/timingsByCity" +
          "?city=" + loc.city +
          "&country=" + loc.country +
          "&method=" + appConfig.display.prayerMethod
        );
        const res = await fetch(url);
        const data = await res.json();
        const timings = data.data.timings;
        setTimes({
          Fajr: timings.Fajr,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
        });
      } catch (err) {
        console.error("Failed to fetch prayer times", err);
      }
    };

    fetchTimes();
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) fetchTimes();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!times) return;
    let nextP = null;
    let minDiff = Infinity;

    PRAYERS.forEach((p) => {
      const timeStr = times[p];
      const prayerDate = parse(timeStr, "HH:mm", new Date());
      let diff = differenceInSeconds(prayerDate, currentTime);

      if (diff < 0) {
        prayerDate.setDate(prayerDate.getDate() + 1);
        diff = differenceInSeconds(prayerDate, currentTime);
      }

      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        nextP = { name: p, time: timeStr, diffSeconds: diff };
      }
    });

    setNextPrayer(nextP);
  }, [currentTime, times]);

  return { times, nextPrayer, currentTime, PRAYERS };
}
