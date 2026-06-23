import { useState, useEffect } from "react";
import { format } from "date-fns";
import { HoloWrapper } from "./HoloWrapper";
import { appConfig } from "../config";

export function ClockWidget() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <HoloWrapper theme="white" className="justify-center items-center text-center">
      <div className="text-xs font-bold font-mono tracking-[0.3em] uppercase text-white mb-2">{appConfig.location.label} / Local Time</div>
      <div className="text-5xl lg:text-6xl font-bold font-sans tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">{format(now, "HH:mm:ss")}</div>
      <div className="text-lg font-bold tracking-widest uppercase text-white mt-4 font-mono">{format(now, "EEEE, MMMM dd")}</div>
    </HoloWrapper>
  );
}
