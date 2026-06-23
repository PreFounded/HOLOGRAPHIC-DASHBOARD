import { HoloWrapper } from "./HoloWrapper";
import { useState, useEffect } from "react";

const messages = [
  "Good morning",
  "Good evening",
  "Welcome",
  "Focus",
  "Breathe",
  "Stay present",
];

export function EmptyWidget() {
  const [msg] = useState(() => messages[Math.floor(Math.random() * messages.length)]);

  return (
    <HoloWrapper theme="green" className="justify-center items-center text-center">
      <h2 className="text-xs font-black font-mono text-emerald-400 uppercase tracking-widest mb-4">Schedule</h2>
      <p className="text-2xl font-bold text-emerald-200/60 italic">{msg}</p>
    </HoloWrapper>
  );
}
